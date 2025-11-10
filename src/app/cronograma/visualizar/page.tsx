"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import * as LZString from "lz-string";
import { CONTENT_REGISTRY } from "@/lib/contentRegistry";
import { getDisplayName } from "@/lib/displayNames";

// Cores das categorias (igual à tela inicial)
const categoryColors = {
  basico: 'from-sky-500 to-blue-600',
  intermediario: 'from-orange-500 to-amber-600',
  avancado: 'from-red-500 to-rose-600',
  taticas: 'from-purple-500 to-violet-600',
};

const categoryBgColors = {
  basico: 'from-sky-50 to-blue-50',
  intermediario: 'from-orange-50 to-amber-50',
  avancado: 'from-red-50 to-rose-50',
  taticas: 'from-purple-50 to-violet-50',
};

const categoryTextColors = {
  basico: 'text-sky-900',
  intermediario: 'text-orange-900',
  avancado: 'text-red-900',
  taticas: 'text-purple-900',
};

const categoryBorderColors = {
  basico: 'border-sky-300',
  intermediario: 'border-orange-300',
  avancado: 'border-red-300',
  taticas: 'border-purple-300',
};

const categoryBadgeBorderColors = {
  basico: 'border-sky-200',
  intermediario: 'border-orange-200',
  avancado: 'border-red-200',
  taticas: 'border-purple-200',
};

const diasSemana = [
  { id: 'segunda', nome: 'Segunda-feira', short: 'Seg' },
  { id: 'terca', nome: 'Terça-feira', short: 'Ter' },
  { id: 'quarta', nome: 'Quarta-feira', short: 'Qua' },
  { id: 'quinta', nome: 'Quinta-feira', short: 'Qui' },
  { id: 'sexta', nome: 'Sexta-feira', short: 'Sex' },
];

interface DiaAula {
  topicosPrincipais: string[];
  topicosComplementares: string[];
  horario: string | null;
}

interface CronogramaData {
  nome: string;
  semana: Record<string, DiaAula>;
}

interface DiaAulaLegacy {
  topico?: string | null;
  topicos?: string[];
  topicosPrincipais?: string[];
  topicosComplementares?: string[];
  horario?: string | null;
}

interface CronogramaDataRaw {
  nome?: string;
  semana?: Record<string, DiaAulaLegacy>;
}

function CronogramaVisualizarContent() {
  const searchParams = useSearchParams();
  const [dados, setDados] = useState<CronogramaData | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    try {
      const dadosEncoded = searchParams.get('d');
      if (dadosEncoded) {
        // Descomprimir os dados usando LZString
        const decompressed = LZString.decompressFromEncodedURIComponent(dadosEncoded);
        if (!decompressed) {
          setErro(true);
          return;
        }
        const dadosDecoded = JSON.parse(decompressed) as CronogramaDataRaw;
        
        // Normalizar dados para novo formato (com topicosPrincipais e topicosComplementares)
        const semanaNormalizada: Record<string, DiaAula> = {};
        Object.entries(dadosDecoded.semana || {}).forEach(([diaId, dia]) => {
          if (dia.topicosPrincipais !== undefined || dia.topicosComplementares !== undefined) {
            // Formato novo: usar diretamente
            semanaNormalizada[diaId] = {
              topicosPrincipais: Array.isArray(dia.topicosPrincipais) ? dia.topicosPrincipais : [],
              topicosComplementares: Array.isArray(dia.topicosComplementares) ? dia.topicosComplementares : [],
              horario: dia.horario || null,
            };
          } else if (dia.topico !== undefined) {
            // Formato antigo (com topico): converter para principal
            semanaNormalizada[diaId] = {
              topicosPrincipais: dia.topico ? [dia.topico] : [],
              topicosComplementares: [],
              horario: dia.horario || null,
            };
          } else if (dia.topicos !== undefined) {
            // Formato antigo (com topicos): converter todos para principais
            semanaNormalizada[diaId] = {
              topicosPrincipais: Array.isArray(dia.topicos) ? dia.topicos : [],
              topicosComplementares: [],
              horario: dia.horario || null,
            };
          } else {
            // Sem dados
            semanaNormalizada[diaId] = {
              topicosPrincipais: [],
              topicosComplementares: [],
              horario: dia.horario || null,
            };
          }
        });
        
        setDados({
          nome: dadosDecoded.nome || '',
          semana: semanaNormalizada,
        });
      } else {
        setErro(true);
      }
    } catch (err) {
      console.error('Erro ao decodificar dados:', err);
      setErro(true);
    }
  }, [searchParams]);

  if (erro || !dados) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Cronograma não encontrado</h1>
          <p className="text-gray-600 mb-6">O link do cronograma é inválido ou expirou.</p>
          <Link
            href="/cronograma"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 text-white transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Criar Novo Cronograma
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <main className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Cronograma de Aulas
            </h1>
            {dados.nome && (
              <p className="text-lg text-gray-700 font-medium">
                Aluno(s): <span className="text-gray-900">{dados.nome}</span>
              </p>
            )}
          </div>

          {/* Grid de Dias da Semana */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
            {diasSemana.map((dia) => {
              const diaData = dados.semana[dia.id];
              const todosTopicos = [...diaData.topicosPrincipais, ...diaData.topicosComplementares];
              const temConteudo = todosTopicos.length > 0 || diaData.horario;
              
              return (
                <div
                  key={dia.id}
                  className={`bg-white rounded-xl border-2 ${
                    temConteudo 
                      ? 'border-sky-300 shadow-md' 
                      : 'border-gray-200'
                  } p-4 transition-all duration-200`}
                >
                  {/* Header do Dia */}
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">{dia.short}</h3>
                    <p className="text-xs text-gray-500 hidden sm:block">{dia.nome}</p>
                  </div>

                  {temConteudo ? (
                    <>
                      {/* Horário */}
                      {diaData.horario && (
                        <div className="flex items-center gap-2 mb-3">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-900">{diaData.horario}</span>
                        </div>
                      )}

                      {/* Lista de Tópicos Principais */}
                      {diaData.topicosPrincipais.length > 0 && (
                        <div className="mb-3">
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tópicos Principais</label>
                          <div className="space-y-2">
                            {diaData.topicosPrincipais.map((topicoId) => {
                              const categoria = CONTENT_REGISTRY[topicoId]?.category || 'basico';
                              return (
                                <Link
                                  key={topicoId}
                                  href={`/estudo/${topicoId}`}
                                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${
                                    categoryBgColors[categoria as keyof typeof categoryBgColors]
                                  } border ${categoryBadgeBorderColors[categoria as keyof typeof categoryBadgeBorderColors]} hover:shadow-md transition-all duration-200 cursor-pointer`}
                                >
                                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${
                                    categoryColors[categoria as keyof typeof categoryColors]
                                  } flex-shrink-0`}></div>
                                  <span className={`text-xs font-semibold ${
                                    categoryTextColors[categoria as keyof typeof categoryTextColors]
                                  }`}>
                                    {getDisplayName(topicoId)}
                                  </span>
                                  <svg className="w-3 h-3 flex-shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Lista de Tópicos Complementares */}
                      {diaData.topicosComplementares.length > 0 && (
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tópicos Complementares</label>
                          <div className="space-y-2">
                            {diaData.topicosComplementares.map((topicoId) => {
                              const categoria = CONTENT_REGISTRY[topicoId]?.category || 'basico';
                              return (
                                <Link
                                  key={topicoId}
                                  href={`/estudo/${topicoId}`}
                                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${
                                    categoryBgColors[categoria as keyof typeof categoryBgColors]
                                  } border ${categoryBadgeBorderColors[categoria as keyof typeof categoryBadgeBorderColors]} hover:shadow-md transition-all duration-200 cursor-pointer opacity-75`}
                                >
                                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${
                                    categoryColors[categoria as keyof typeof categoryColors]
                                  } flex-shrink-0`}></div>
                                  <span className={`text-xs font-semibold ${
                                    categoryTextColors[categoria as keyof typeof categoryTextColors]
                                  }`}>
                                    {getDisplayName(topicoId)}
                                  </span>
                                  <svg className="w-3 h-3 flex-shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Sem aula</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Botão Voltar */}
          <div className="mt-8 text-center">
            <Link
              href="/cronograma"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CronogramaVisualizarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando cronograma...</p>
        </div>
      </div>
    }>
      <CronogramaVisualizarContent />
    </Suspense>
  );
}

