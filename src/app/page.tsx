"use client";
import { useState } from "react";
import { BASIC_SECTIONS, INTERMEDIATE_SECTIONS, ADVANCED_SECTIONS, TACTICS_SECTIONS, type Section } from "@/lib/sections";
import Modal from "@/components/Modal";
import SectionModal from "@/components/SectionModal";

const sectionColors: Record<string, string> = {
  // Básico - tons de verde (iniciante)
  "Regras": "bg-gradient-to-br from-emerald-400 to-emerald-600",
  "Saque": "bg-gradient-to-br from-green-400 to-green-600",
  "Devolução": "bg-gradient-to-br from-teal-400 to-teal-600",
  "Voleio": "bg-gradient-to-br from-lime-400 to-lime-600",
  "Footwork": "bg-gradient-to-br from-cyan-400 to-cyan-600",
  "Posicionamento": "bg-gradient-to-br from-emerald-500 to-green-600",
  "Erros Comuns": "bg-gradient-to-br from-teal-500 to-cyan-600",
  "Dicas": "bg-gradient-to-br from-green-500 to-emerald-600",
  
  // Intermediário - tons de azul/roxo
  "Dink": "bg-gradient-to-br from-blue-400 to-blue-600",
  "Drop Shot": "bg-gradient-to-br from-indigo-400 to-indigo-600",
  "Terceira bola": "bg-gradient-to-br from-violet-400 to-violet-600",
  "Lob": "bg-gradient-to-br from-purple-400 to-purple-600",
  "Transição": "bg-gradient-to-br from-sky-400 to-sky-600",
  "Jogo de Duplas": "bg-gradient-to-br from-blue-500 to-indigo-600",
  "Defesa": "bg-gradient-to-br from-indigo-500 to-purple-600",
  "Bloqueio": "bg-gradient-to-br from-violet-500 to-purple-600",
  "Drills e Treinos": "bg-gradient-to-br from-cyan-500 to-blue-600",
  "Preparação Física": "bg-gradient-to-br from-sky-500 to-indigo-600",
  
  // Avançado - tons de vermelho/laranja (intenso)
  "Smash": "bg-gradient-to-br from-red-400 to-red-600",
  "Acelerar as bolas": "bg-gradient-to-br from-orange-400 to-orange-600",
  "Reset": "bg-gradient-to-br from-amber-400 to-amber-600",
  "Ataque": "bg-gradient-to-br from-rose-400 to-rose-600",
  "Táticas": "bg-gradient-to-br from-pink-400 to-pink-600",
  "Mental Game": "bg-gradient-to-br from-fuchsia-400 to-fuchsia-600",
  "Erne": "bg-gradient-to-br from-red-500 to-orange-600",
  "ATP (Around The Post)": "bg-gradient-to-br from-orange-500 to-amber-600",
  "Stacking": "bg-gradient-to-br from-rose-500 to-pink-600",
  "Switching": "bg-gradient-to-br from-pink-500 to-fuchsia-600",
  "Poaching": "bg-gradient-to-br from-red-500 to-rose-600",
  "Finalizações": "bg-gradient-to-br from-orange-500 to-red-600",
  "Jogo Singles": "bg-gradient-to-br from-amber-500 to-orange-600",
  "Torneios": "bg-gradient-to-br from-fuchsia-500 to-purple-600",
  
  // Básico - novos
  "Empunhadura": "bg-gradient-to-br from-green-500 to-emerald-600",
  "Aquecimento": "bg-gradient-to-br from-teal-500 to-green-600",
  "Equipamentos": "bg-gradient-to-br from-cyan-500 to-teal-600",
  
  // Intermediário - novos
  "Spin": "bg-gradient-to-br from-blue-500 to-cyan-600",
  "Contra-ataque": "bg-gradient-to-br from-indigo-500 to-blue-600",
  "Comunicação": "bg-gradient-to-br from-violet-500 to-indigo-600",
  "Estratégia de Jogo": "bg-gradient-to-br from-purple-500 to-violet-600",

  // Táticas - tons de roxo/magenta (estratégia)
  "Controle de Ritmo": "bg-gradient-to-br from-purple-400 to-purple-600",
  "Jogo no Meio": "bg-gradient-to-br from-violet-400 to-violet-600",
  "Explorar Fraquezas": "bg-gradient-to-br from-fuchsia-400 to-fuchsia-600",
  "Variação de Altura": "bg-gradient-to-br from-purple-500 to-fuchsia-600",
  "Pressão Constante": "bg-gradient-to-br from-violet-500 to-purple-600",
  "Jogo Cruzado": "bg-gradient-to-br from-fuchsia-500 to-pink-600",
  "Isolamento de Jogador": "bg-gradient-to-br from-purple-500 to-violet-600",
  "Mudança de Direção": "bg-gradient-to-br from-violet-500 to-fuchsia-600",
  "Jogo de Paciência": "bg-gradient-to-br from-fuchsia-500 to-purple-600",
  "Ataque ao Corpo": "bg-gradient-to-br from-purple-600 to-fuchsia-700",
  "Uso do Lob Tático": "bg-gradient-to-br from-violet-600 to-purple-700",
  "Forçar Erros": "bg-gradient-to-br from-fuchsia-600 to-violet-700",
};

const SectionCard = ({ section, onClick }: { section: Section; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="card block p-4 group hover:scale-[1.02] active:scale-100 transition-transform duration-300 w-full text-left"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`section-icon ${sectionColors[section]} text-white shadow-md group-hover:shadow-lg group-hover:scale-110`}>
          {section.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 text-sm">{section}</span>
          <span className="text-xs text-gray-500">Ver recursos</span>
        </div>
      </div>
      <svg className="w-4 h-4 text-gray-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </button>
);

export default function Home() {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  return (
    <main className="py-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 tracking-tight bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
          Principais Temas
        </h1>
        <p className="text-gray-600 text-lg">Explore conteúdos organizados por nível de dificuldade.</p>
      </div>

      {/* Básico */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Básico</h2>
          <span className="badge badge-primary text-xs">Iniciante</span>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BASIC_SECTIONS.map((s) => (
            <li key={s}>
              <SectionCard section={s} onClick={() => setSelectedSection(s)} />
            </li>
          ))}
        </ul>
      </section>

      {/* Intermediário */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-sm">
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Intermediário</h2>
          <span className="badge badge-secondary text-xs">Progresso</span>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTERMEDIATE_SECTIONS.map((s) => (
            <li key={s}>
              <SectionCard section={s} onClick={() => setSelectedSection(s)} />
            </li>
          ))}
        </ul>
      </section>

      {/* Avançado */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-700 font-bold text-sm">
            3
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Avançado</h2>
          <span className="badge bg-red-100 text-red-700 text-xs">Expert</span>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANCED_SECTIONS.map((s) => (
            <li key={s}>
              <SectionCard section={s} onClick={() => setSelectedSection(s)} />
            </li>
          ))}
        </ul>
      </section>

      {/* Táticas */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-bold text-sm">
            4
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Táticas</h2>
          <span className="badge bg-purple-100 text-purple-700 text-xs">Estratégia</span>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TACTICS_SECTIONS.map((s) => (
            <li key={s}>
              <SectionCard section={s} onClick={() => setSelectedSection(s)} />
            </li>
          ))}
        </ul>
      </section>

      <Modal isOpen={!!selectedSection} onClose={() => setSelectedSection(null)}>
        {selectedSection && (
          <SectionModal section={selectedSection} onClose={() => setSelectedSection(null)} />
        )}
      </Modal>
    </main>
  );
}
