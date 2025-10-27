"use client";

export default function ContribuaPage() {
  return (
    <main className="py-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
          Contribua com o Projeto
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Este projeto é colaborativo e está aberto a ideias, sugestões e melhorias. Sua participação é muito bem-vinda!
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Seções de contribuição */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Sugerir Melhorias</h3>
            <p className="text-sm text-gray-600">
              Compartilhe suas ideias para tornar o projeto ainda melhor
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
            <div className="text-3xl mb-3">🐛</div>
            <h3 className="font-semibold text-gray-900 mb-2">Reportar Problemas</h3>
            <p className="text-sm text-gray-600">
              Ajude-nos a identificar e corrigir bugs
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900 mb-2">Compartilhar Conhecimento</h3>
            <p className="text-sm text-gray-600">
              Envie dicas, técnicas ou conteúdo sobre pickleball
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
            <div className="text-3xl mb-3">📢</div>
            <h3 className="font-semibold text-gray-900 mb-2">Divulgar o Projeto</h3>
            <p className="text-sm text-gray-600">
              Compartilhe com outros jogadores e professores
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">
              Vamos Conversar?
            </h3>
            <p className="text-green-50 text-sm mb-6 max-w-md mx-auto">
              Envie suas ideias, sugestões ou perguntas. 
            </p>
            
            {/* Email */}
            <a 
              href="mailto:ziliottipessoal@gmail.com" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold bg-white text-green-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Enviar E-mail
            </a>
            
            <br />
            <br />
            
            {/* Links sociais e perfil */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/fabricioziliotti_pb/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-green-100 transition-colors text-sm font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @fabricioziliotti_pb
              </a>
              
              {/* Link para perfil */}
              <a 
                href="https://pickleball-brasil.github.io/fabricio-ziliotti/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-green-100 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Ver perfil completo
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

