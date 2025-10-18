"use client";
// Admin desabilitado temporariamente - Firebase e NextAuth comentados
// TODO: Descomentar quando integrar Firebase e autenticação

/*
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { SECTIONS, type Section } from "@/lib/sections";

type MapState = Record<Section, string[]>;

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<MapState>(() => {
    const initial: MapState = {} as MapState;
    SECTIONS.forEach(s => { initial[s] = []; });
    return initial;
  });
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<Section | null>(null);
  const isAuthed = status === "authenticated";

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/links");
        if (!res.ok) return;
        const rows = await res.json();
        const map: MapState = {} as MapState;
        SECTIONS.forEach(s => { map[s] = []; });
        for (const row of rows as Array<{ section: Section; urls: string[] }>) {
          if (SECTIONS.includes(row.section)) map[row.section] = row.urls || [];
        }
        setData(map);
      } catch {}
    })();
  }, []);

  const handleSave = async (section: Section) => {
    setLoading(true);
    setSaveSuccess(null);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, urls: data[section].filter(u => u.trim()) }),
      });
      if (res.ok) {
        setSaveSuccess(section);
        setTimeout(() => setSaveSuccess(null), 2000);
      } else {
        alert("Falha ao salvar");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (section: Section) => {
    if (!confirm(`Remover todos os links de ${section}?`)) return;
    setLoading(true);
    try {
      const res = await fetch("/api/links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section }),
      });
      if (res.ok) setData(prev => ({ ...prev, [section]: [] }));
    } finally {
      setLoading(false);
    }
  };

  const setSectionLine = (section: Section, index: number, value: string) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map((v, i) => (i === index ? value : v)),
    }));
  };

  const addLine = (section: Section) => setData(prev => ({ ...prev, [section]: [...prev[section], ""] }));
  const removeLine = (section: Section, index: number) => setData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));

  if (!isAuthed) {
    return (
      <main className="py-4">
        <div className="card p-10 text-center max-w-md mx-auto">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-3 tracking-tight">Admin</h1>
          <p className="text-gray-600 mb-6">Faça login para gerenciar os links.</p>
          <button className="btn btn-primary w-full" onClick={() => signIn("google")}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
            </svg>
            Entrar com Google
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="py-4">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200/50">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">Admin</h1>
          <p className="text-gray-600 text-sm mt-1">Gerencie os links de cada seção</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-gray-500">Logado como</span>
            <span className="text-sm text-gray-700 font-medium">{session?.user?.email}</span>
          </div>
          <button className="btn btn-ghost" onClick={() => signOut()}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <div key={section} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{section}</h2>
              <div className="flex gap-2">
                <button 
                  disabled={loading} 
                  className={`btn ${saveSuccess === section ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => handleSave(section)}
                >
                  {saveSuccess === section ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Salvo!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      Salvar
                    </>
                  )}
                </button>
                <button disabled={loading} className="btn btn-danger" onClick={() => handleDelete(section)}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Limpar
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {data[section].length === 0 ? (
                <div className="text-center py-6 text-gray-500 text-sm">
                  Nenhum link adicionado
                </div>
              ) : (
                data[section].map((value, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <input
                        className="input"
                        placeholder="https://exemplo.com/recurso"
                        value={value}
                        onChange={(e) => setSectionLine(section, idx, e.target.value)}
                      />
                    </div>
                    <button className="btn btn-ghost flex-shrink-0" onClick={() => removeLine(section, idx)}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
              <button className="btn btn-ghost w-full" onClick={() => addLine(section)}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Adicionar link
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
*/

// Página admin temporária (sem autenticação)
export default function AdminPage() {
  return (
    <main className="py-8">
      <div className="card p-10 text-center max-w-2xl mx-auto">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3 tracking-tight">Admin Desabilitado</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          O painel administrativo está temporariamente desabilitado.<br/>
          Firebase e autenticação foram comentados no código.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-700 mb-2"><strong>Para editar os links:</strong></p>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Abra o arquivo <code className="bg-gray-200 px-1 rounded">src/lib/mockData.ts</code></li>
            <li>Edite os arrays de URLs de cada seção</li>
            <li>Salve o arquivo</li>
            <li>A página será atualizada automaticamente</li>
          </ol>
        </div>
        <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <strong>💡 Dica:</strong> Para habilitar Firebase e autenticação, descomente o código nos arquivos marcados com &quot;TODO&quot; e configure as variáveis de ambiente.
        </div>
      </div>
    </main>
  );
}
