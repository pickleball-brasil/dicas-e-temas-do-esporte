"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import * as LZString from "lz-string";
import { CONTENT_REGISTRY } from "@/lib/contentRegistry";
import { getDisplayName } from "@/lib/displayNames";
import { SECTIONS } from "@/lib/sections";
import { RECOMMENDED_VIDEOS } from "@/lib/recommendedVideos";

// Cores das categorias (igual à tela inicial)
const categoryColors = {
  basico: 'from-sky-500 to-blue-600',
  intermediario: 'from-orange-500 to-amber-600',
  avancado: 'from-red-500 to-rose-600',
  taticas: 'from-purple-500 to-violet-600',
};

const categoryTextColors = {
  basico: 'text-sky-900',
  intermediario: 'text-orange-900',
  avancado: 'text-red-900',
  taticas: 'text-purple-900',
};

const categoryBgColors = {
  basico: 'from-sky-50 to-blue-50',
  intermediario: 'from-orange-50 to-amber-50',
  avancado: 'from-red-50 to-rose-50',
  taticas: 'from-purple-50 to-violet-50',
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

const horarios = [
  '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

interface DiaAula {
  topicosPrincipais: string[];
  topicosComplementares: string[];
  linksComplementares: string[]; // IDs dos vídeos recomendados
  horario: string | null;
  observacoes: string;
}

export default function CronogramaPage() {
  const [nomeAluno, setNomeAluno] = useState("");
  const [semana, setSemana] = useState<Record<string, DiaAula>>({
    segunda: { topicosPrincipais: [], topicosComplementares: [], linksComplementares: [], horario: null, observacoes: "" },
    terca: { topicosPrincipais: [], topicosComplementares: [], linksComplementares: [], horario: null, observacoes: "" },
    quarta: { topicosPrincipais: [], topicosComplementares: [], linksComplementares: [], horario: null, observacoes: "" },
    quinta: { topicosPrincipais: [], topicosComplementares: [], linksComplementares: [], horario: null, observacoes: "" },
    sexta: { topicosPrincipais: [], topicosComplementares: [], linksComplementares: [], horario: null, observacoes: "" },
  });
  const [copied, setCopied] = useState(false);
  const [buscaTopicos, setBuscaTopicos] = useState<Record<string, string>>({});
  const [tipoTopicoSelecionado, setTipoTopicoSelecionado] = useState<Record<string, 'principal' | 'complementar'>>({});

  const todasSections = SECTIONS.map(s => ({
    id: s,
    nome: getDisplayName(s),
    categoria: CONTENT_REGISTRY[s]?.category || 'basico',
    level: CONTENT_REGISTRY[s]?.level || 'Básico',
  }));

  const adicionarTopico = (diaId: string, topicoId: string, tipo: 'principal' | 'complementar') => {
    setSemana(prev => {
      const dia = prev[diaId];
      // Remover de ambos os arrays primeiro (caso já esteja em algum)
      const topicosPrincipais = dia.topicosPrincipais.filter(t => t !== topicoId);
      const topicosComplementares = dia.topicosComplementares.filter(t => t !== topicoId);
      
      // Adicionar no array correto
      if (tipo === 'principal') {
        topicosPrincipais.push(topicoId);
      } else {
        topicosComplementares.push(topicoId);
      }
      
      return {
        ...prev,
        [diaId]: {
          ...dia,
          topicosPrincipais,
          topicosComplementares,
        },
      };
    });
  };

  const removerTopico = (diaId: string, topicoId: string, tipo: 'principal' | 'complementar') => {
    setSemana(prev => ({
      ...prev,
      [diaId]: {
        ...prev[diaId],
        [tipo === 'principal' ? 'topicosPrincipais' : 'topicosComplementares']: 
          prev[diaId][tipo === 'principal' ? 'topicosPrincipais' : 'topicosComplementares'].filter(t => t !== topicoId),
      },
    }));
  };

  const atualizarHorario = (diaId: string, horario: string | null) => {
    setSemana(prev => ({
      ...prev,
      [diaId]: {
        ...prev[diaId],
        horario,
      },
    }));
  };

  const atualizarObservacoes = (diaId: string, observacoes: string) => {
    setSemana(prev => ({
      ...prev,
      [diaId]: {
        ...prev[diaId],
        observacoes,
      },
    }));
  };

  const adicionarLink = (diaId: string, videoId: string) => {
    setSemana(prev => ({
      ...prev,
      [diaId]: {
        ...prev[diaId],
        linksComplementares: [...prev[diaId].linksComplementares, videoId],
      },
    }));
  };

  const removerLink = (diaId: string, videoId: string) => {
    setSemana(prev => ({
      ...prev,
      [diaId]: {
        ...prev[diaId],
        linksComplementares: prev[diaId].linksComplementares.filter(id => id !== videoId),
      },
    }));
  };

  const limparDia = (diaId: string) => {
    setSemana(prev => ({
      ...prev,
      [diaId]: { topicosPrincipais: [], topicosComplementares: [], linksComplementares: [], horario: null, observacoes: "" },
    }));
  };

  const limparTudo = () => {
    setSemana({
      segunda: { topicosPrincipais: [], topicosComplementares: [], linksComplementares: [], horario: null, observacoes: "" },
      terca: { topicosPrincipais: [], topicosComplementares: [], linksComplementares: [], horario: null, observacoes: "" },
      quarta: { topicosPrincipais: [], topicosComplementares: [], linksComplementares: [], horario: null, observacoes: "" },
      quinta: { topicosPrincipais: [], topicosComplementares: [], linksComplementares: [], horario: null, observacoes: "" },
      sexta: { topicosPrincipais: [], topicosComplementares: [], linksComplementares: [], horario: null, observacoes: "" },
    });
    setNomeAluno("");
  };

  const gerarLink = () => {
    return urlGerada;
  };

  const copiarLink = async () => {
    const link = gerarLink();
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar link:', err);
    }
  };

  const temDados = Object.values(semana).some(d => d.topicosPrincipais.length > 0 || d.topicosComplementares.length > 0 || d.linksComplementares.length > 0 || d.horario || d.observacoes.trim()) || nomeAluno.trim();

  // Interface para dados otimizados
  interface DiaAulaOtimizado {
    tp?: string[];
    tc?: string[];
    lc?: string[];
    h?: string | null;
    o?: string;
  }

  interface DadosOtimizados {
    n?: string;
    s?: Record<string, DiaAulaOtimizado>;
  }

  // Função para otimizar e compactar dados antes da compressão
  const otimizarDados = (dados: { nome: string; semana: Record<string, DiaAula> }): DadosOtimizados => {
    const semanaOtimizada: Record<string, DiaAulaOtimizado> = {};
    
    Object.entries(dados.semana).forEach(([diaId, dia]) => {
      // Só incluir dias que têm conteúdo
      if (dia.topicosPrincipais.length === 0 && 
          dia.topicosComplementares.length === 0 && 
          dia.linksComplementares.length === 0 && 
          !dia.horario && 
          !dia.observacoes.trim()) {
        return; // Pular dias vazios
      }

      const diaOtimizado: DiaAulaOtimizado = {};
      
      // Usar chaves abreviadas
      if (dia.topicosPrincipais.length > 0) {
        diaOtimizado.tp = dia.topicosPrincipais;
      }
      if (dia.topicosComplementares.length > 0) {
        diaOtimizado.tc = dia.topicosComplementares;
      }
      if (dia.linksComplementares.length > 0) {
        diaOtimizado.lc = dia.linksComplementares;
      }
      if (dia.horario) {
        diaOtimizado.h = dia.horario;
      }
      if (dia.observacoes.trim()) {
        // Limitar observações a 200 caracteres para reduzir tamanho
        diaOtimizado.o = dia.observacoes.trim().substring(0, 200);
      }
      
      semanaOtimizada[diaId] = diaOtimizado;
    });

    const dadosOtimizados: DadosOtimizados = {};
    if (dados.nome.trim()) {
      dadosOtimizados.n = dados.nome.trim();
    }
    if (Object.keys(semanaOtimizada).length > 0) {
      dadosOtimizados.s = semanaOtimizada;
    }

    return dadosOtimizados;
  };

  // Calcular URL em tempo real
  const urlGerada = useMemo(() => {
    if (!temDados) return "";
    const dados = {
      nome: nomeAluno.trim(),
      semana: semana,
    };
    
    // Otimizar dados antes de comprimir
    const dadosOtimizados = otimizarDados(dados);
    const jsonString = JSON.stringify(dadosOtimizados);
    const compressed = LZString.compressToEncodedURIComponent(jsonString);
    return `${typeof window !== 'undefined' ? window.location.origin : ''}/dicas-e-temas-do-esporte/cronograma/visualizar?d=${compressed}`;
  }, [semana, nomeAluno, temDados]);

  return (
    <div className="min-h-screen">
      <main className="py-6 sm:py-8">
        <div className="max-w-[100rem] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Cronograma de Aulas
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Configure a semana de aulas e compartilhe com seus alunos
              </p>
            </div>

            {/* Nome do(s) Aluno(s) */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-6">
              <label htmlFor="nomeAluno" className="block text-sm font-medium text-gray-700 mb-2">
                Nome do(s) aluno(s)
              </label>
              <input
                id="nomeAluno"
                type="text"
                value={nomeAluno}
                onChange={(e) => setNomeAluno(e.target.value)}
                placeholder="Digite o nome do(s) aluno(s)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 placeholder:text-gray-400"
                maxLength={50}
              />
            </div>
          </div>

          {/* Grid de Dias da Semana */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
            {diasSemana.map((dia) => {
              const diaData = semana[dia.id];
              const todosTopicos = [...diaData.topicosPrincipais, ...diaData.topicosComplementares];
              const temConteudo = todosTopicos.length > 0 || diaData.horario;
              const buscaTermo = buscaTopicos[dia.id] || '';
              const tipoSelecionado = tipoTopicoSelecionado[dia.id] || 'principal';
              const topicosDisponiveis = todasSections.filter(s => {
                const naoSelecionado = !todosTopicos.includes(s.id);
                const matchBusca = buscaTermo.trim() === '' || 
                  s.nome.toLowerCase().includes(buscaTermo.toLowerCase()) ||
                  s.id.toLowerCase().includes(buscaTermo.toLowerCase());
                return naoSelecionado && matchBusca;
              });
              
              return (
                <div
                  key={dia.id}
                  className={`bg-white rounded-xl border-2 ${
                    temConteudo ? 'border-sky-300 shadow-md' : 'border-gray-200'
                  } p-4 transition-all duration-200 hover:shadow-lg`}
                >
                  {/* Header do Dia */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{dia.short}</h3>
                      <p className="text-xs text-gray-500 hidden sm:block">{dia.nome}</p>
                    </div>
                    {temConteudo && (
                      <button
                        onClick={() => limparDia(dia.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Limpar dia"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Lista de Tópicos Principais */}
                  {diaData.topicosPrincipais.length > 0 && (
                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tópicos Principais</label>
                      <div className="space-y-2">
                        {diaData.topicosPrincipais.map((topicoId) => {
                          const categoria = CONTENT_REGISTRY[topicoId]?.category || 'basico';
                          return (
                            <div
                              key={topicoId}
                              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gradient-to-r ${
                                categoryBgColors[categoria as keyof typeof categoryBgColors]
                              } border ${categoryBadgeBorderColors[categoria as keyof typeof categoryBadgeBorderColors]}`}
                            >
                              <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${
                                categoryColors[categoria as keyof typeof categoryColors]
                              } flex-shrink-0`}></div>
                              <span className={`text-xs font-semibold flex-1 truncate ${
                                categoryTextColors[categoria as keyof typeof categoryTextColors]
                              }`}>
                                {getDisplayName(topicoId)}
                              </span>
                              <button
                                onClick={() => removerTopico(dia.id, topicoId, 'principal')}
                                className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                title="Remover tópico"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Lista de Tópicos Complementares */}
                  {diaData.topicosComplementares.length > 0 && (
                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tópicos Complementares</label>
                      <div className="space-y-2">
                        {diaData.topicosComplementares.map((topicoId) => {
                          const categoria = CONTENT_REGISTRY[topicoId]?.category || 'basico';
                          return (
                            <div
                              key={topicoId}
                              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gradient-to-r ${
                                categoryBgColors[categoria as keyof typeof categoryBgColors]
                              } border ${categoryBadgeBorderColors[categoria as keyof typeof categoryBadgeBorderColors]} opacity-75`}
                            >
                              <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${
                                categoryColors[categoria as keyof typeof categoryColors]
                              } flex-shrink-0`}></div>
                              <span className={`text-xs font-semibold flex-1 truncate ${
                                categoryTextColors[categoria as keyof typeof categoryTextColors]
                              }`}>
                                {getDisplayName(topicoId)}
                              </span>
                              <button
                                onClick={() => removerTopico(dia.id, topicoId, 'complementar')}
                                className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                title="Remover tópico"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Seletor de Tipo de Tópico */}
                  <div className="mb-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Tipo de Tópico
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTipoTopicoSelecionado(prev => ({ ...prev, [dia.id]: 'principal' }))}
                        className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          tipoSelecionado === 'principal'
                            ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Principal
                      </button>
                      <button
                        onClick={() => setTipoTopicoSelecionado(prev => ({ ...prev, [dia.id]: 'complementar' }))}
                        className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          tipoSelecionado === 'complementar'
                            ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Complementar
                      </button>
                    </div>
                  </div>

                  {/* Seletor de Tópico com Busca */}
                  <div className="mb-3 relative">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Adicionar Tópico
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={buscaTermo}
                        onChange={(e) => {
                          setBuscaTopicos(prev => ({ ...prev, [dia.id]: e.target.value }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && topicosDisponiveis.length > 0) {
                            e.preventDefault();
                            adicionarTopico(dia.id, topicosDisponiveis[0].id, tipoSelecionado);
                            setBuscaTopicos(prev => ({ ...prev, [dia.id]: '' }));
                          }
                        }}
                        placeholder="Buscar ou digite o nome..."
                        className="w-full px-2 py-1.5 pr-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 bg-white placeholder:text-gray-400"
                      />
                      <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    {/* Lista de Sugestões */}
                    {buscaTermo.trim() && topicosDisponiveis.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {topicosDisponiveis.slice(0, 5).map((section) => {
                          const categoria = section.categoria as keyof typeof categoryColors;
                          return (
                            <button
                              key={section.id}
                              onClick={() => {
                                adicionarTopico(dia.id, section.id, tipoSelecionado);
                                setBuscaTopicos(prev => ({ ...prev, [dia.id]: '' }));
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                            >
                              <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${
                                categoryColors[categoria]
                              } flex-shrink-0`}></div>
                              <span className="text-sm text-gray-700">{section.nome}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Links Complementares (Vídeos) */}
                  {diaData.linksComplementares.length > 0 && (
                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Links Complementares</label>
                      <div className="space-y-2">
                        {diaData.linksComplementares.map((videoId) => {
                          const video = RECOMMENDED_VIDEOS.find(v => v.id === videoId);
                          if (!video) return null;
                          return (
                            <div
                              key={videoId}
                              className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200"
                            >
                              <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-semibold text-purple-900 block truncate">{video.title}</span>
                                {video.channel && (
                                  <span className="text-xs text-purple-600 block truncate">{video.channel}</span>
                                )}
                              </div>
                              <button
                                onClick={() => removerLink(dia.id, videoId)}
                                className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                title="Remover link"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Seletor de Vídeo */}
                  {RECOMMENDED_VIDEOS.filter(v => !diaData.linksComplementares.includes(v.id)).length > 0 && (
                    <div className="mb-3 relative">
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Adicionar Link Complementar (Vídeo)
                      </label>
                      <div className="relative">
                        <select
                          defaultValue=""
                          onChange={(e) => {
                            if (e.target.value) {
                              adicionarLink(dia.id, e.target.value);
                              e.target.value = "";
                            }
                          }}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 bg-white"
                        >
                          <option value="">Selecione um vídeo...</option>
                          {RECOMMENDED_VIDEOS
                            .filter(v => !diaData.linksComplementares.includes(v.id))
                            .map((video) => (
                              <option key={video.id} value={video.id}>
                                {video.title} {video.channel ? `- ${video.channel}` : ''}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Seletor de Horário */}
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Horário
                    </label>
                    <select
                      value={diaData.horario || ''}
                      onChange={(e) => atualizarHorario(dia.id, e.target.value || null)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 bg-white"
                    >
                      <option value="">Selecione...</option>
                      {horarios.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Campo de Observações */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Observações
                    </label>
                    <textarea
                      value={diaData.observacoes}
                      onChange={(e) => atualizarObservacoes(dia.id, e.target.value)}
                      placeholder="Adicione observações para este dia..."
                      rows={3}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 bg-white placeholder:text-gray-400 resize-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Preview e URL */}
          {temDados && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Preview do Cronograma</h2>
              
              {/* Preview do Header */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Cronograma de Aulas</h3>
                {nomeAluno.trim() && (
                  <p className="text-sm text-gray-600">
                    Aluno(s): <span className="font-medium text-gray-900">{nomeAluno.trim()}</span>
                  </p>
                )}
              </div>

              {/* Preview dos Dias */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-6">
                {diasSemana.map((dia) => {
                  const diaData = semana[dia.id];
                  const todosTopicos = [...diaData.topicosPrincipais, ...diaData.topicosComplementares];
                  const temConteudo = todosTopicos.length > 0 || diaData.linksComplementares.length > 0 || diaData.horario || diaData.observacoes.trim();
                  
                  return (
                    <div
                      key={dia.id}
                      className={`bg-gray-50 rounded-lg border-2 p-3 ${
                        temConteudo 
                          ? 'border-sky-300' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="pb-2 border-b border-gray-200 mb-2">
                        <h4 className="text-sm font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                          {dia.nome}
                        </h4>
                      </div>
                      
                      {temConteudo ? (
                        <div className="space-y-2">
                          {diaData.horario && (
                            <div className="text-xs font-semibold text-sky-700">
                              🕐 {diaData.horario}
                            </div>
                          )}
                          {diaData.topicosPrincipais.length > 0 && (
                            <div>
                              <div className="text-[10px] font-semibold text-gray-600 mb-1">Principais:</div>
                              <div className="space-y-1">
                                {diaData.topicosPrincipais.slice(0, 2).map((topicoId) => {
                                  return (
                                    <div key={topicoId} className="text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 text-sky-900 truncate">
                                      {getDisplayName(topicoId)}
                                    </div>
                                  );
                                })}
                                {diaData.topicosPrincipais.length > 2 && (
                                  <div className="text-[10px] text-gray-500">+{diaData.topicosPrincipais.length - 2} mais</div>
                                )}
                              </div>
                            </div>
                          )}
                          {diaData.topicosComplementares.length > 0 && (
                            <div>
                              <div className="text-[10px] font-semibold text-gray-600 mb-1">Complementares:</div>
                              <div className="text-[10px] text-gray-500 opacity-75">{diaData.topicosComplementares.length} tópico(s)</div>
                            </div>
                          )}
                          {diaData.linksComplementares.length > 0 && (
                            <div className="text-[10px] text-gray-500">📹 {diaData.linksComplementares.length} vídeo(s)</div>
                          )}
                          {diaData.observacoes.trim() && (
                            <div className="text-[10px] text-gray-500 italic truncate" title={diaData.observacoes}>
                              📝 {diaData.observacoes.trim().substring(0, 30)}...
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">Sem aula</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Campo de URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL de Compartilhamento
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={urlGerada}
                    readOnly
                    className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(urlGerada);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 flex items-center justify-center"
                    title="Copiar URL"
                  >
                    {copied ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Tamanho da URL: <span className="font-mono font-semibold">{urlGerada.length}</span> caracteres {urlGerada.length > 0 && (
                    <span className="text-gray-400">({Math.round((urlGerada.length / 2000) * 100)}% do limite recomendado)</span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {temDados && (
                <button
                  onClick={limparTudo}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limpar Tudo
                </button>
              )}

              {temDados && (
                <>
                  <button
                    onClick={copiarLink}
                    className={`flex-1 px-4 py-2.5 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                      copied
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Link Copiado!
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copiar Link
                      </>
                    )}
                  </button>
                  <Link
                    href={gerarLink()}
                    target="_blank"
                    className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-700 hover:to-sky-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visualizar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

