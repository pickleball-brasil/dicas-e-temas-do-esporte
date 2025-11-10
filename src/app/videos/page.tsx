"use client";
import { RECOMMENDED_VIDEOS, type RecommendedVideo } from "@/lib/recommendedVideos";

const categoryLabels: Record<RecommendedVideo['category'], string> = {
  'técnica': 'Técnica',
  'estratégia': 'Estratégia',
  'drills': 'Drills',
  'partidas': 'Partidas',
  'dicas': 'Dicas',
  'outros': 'Outros',
};

// Cores para os títulos das categorias - Gradientes azul, laranja, vermelho e roxo (padronizado)
const categoryHeaderColors: Record<RecommendedVideo['category'], string> = {
  'técnica': 'bg-gradient-to-r from-sky-50 to-blue-50 text-sky-900 border-sky-200',
  'estratégia': 'bg-gradient-to-r from-purple-50 to-violet-50 text-purple-900 border-purple-200',
  'drills': 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-900 border-orange-200',
  'partidas': 'bg-gradient-to-r from-red-50 to-rose-50 text-red-900 border-red-200',
  'dicas': 'bg-gradient-to-r from-sky-50 to-blue-50 text-sky-900 border-sky-200',
  'outros': 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-900 border-gray-200',
};

const categoryTextColors: Record<RecommendedVideo['category'], string> = {
  'técnica': 'text-sky-900',
  'estratégia': 'text-purple-900',
  'drills': 'text-orange-900',
  'partidas': 'text-red-900',
  'dicas': 'text-sky-900',
  'outros': 'text-gray-900',
};

// Cores dos ícones das categorias
const categoryIconColors: Record<RecommendedVideo['category'], string> = {
  'técnica': 'bg-gradient-to-br from-sky-500 to-blue-600',
  'estratégia': 'bg-gradient-to-br from-purple-500 to-violet-600',
  'drills': 'bg-gradient-to-br from-orange-500 to-amber-600',
  'partidas': 'bg-gradient-to-br from-red-500 to-rose-600',
  'dicas': 'bg-gradient-to-br from-sky-500 to-blue-600',
  'outros': 'bg-gradient-to-br from-gray-500 to-slate-600',
};

export default function VideosPage() {
  const videosByCategory = RECOMMENDED_VIDEOS.reduce((acc, video) => {
    if (!acc[video.category]) {
      acc[video.category] = [];
    }
    acc[video.category].push(video);
    return acc;
  }, {} as Record<RecommendedVideo['category'], RecommendedVideo[]>);

  const categories = Object.keys(categoryLabels) as RecommendedVideo['category'][];

  return (
    <main className="py-4 pt-6 sm:pt-8">
      {/* Header da página */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Vídeos Recomendados
        </h1>
        <p className="text-sm sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
          Uma seleção de vídeos do YouTube sobre pickleball que recomendamos para seu aprendizado e desenvolvimento.
        </p>
      </div>

      {RECOMMENDED_VIDEOS.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-600 font-semibold text-lg mb-2">Nenhum vídeo adicionado ainda</p>
          <p className="text-gray-500 text-sm">
            Adicione vídeos recomendados editando o arquivo <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">src/lib/recommendedVideos.ts</code>
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => {
            const videos = videosByCategory[category] || [];
            if (videos.length === 0) return null;

            return (
              <section key={category} className="mb-10">
                {/* Header da categoria - Padronizado */}
                <div className={`rounded-xl border-2 ${categoryHeaderColors[category]} px-3 sm:px-5 py-2 sm:py-3 mb-4 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden`}>
                  {/* Decorative gradient overlay */}
                  <div className={`absolute inset-0 ${
                    category === 'técnica' ? 'bg-gradient-to-br from-sky-100/50 to-blue-100/30' :
                    category === 'estratégia' ? 'bg-gradient-to-br from-purple-100/50 to-violet-100/30' :
                    category === 'drills' ? 'bg-gradient-to-br from-orange-100/50 to-amber-100/30' :
                    category === 'partidas' ? 'bg-gradient-to-br from-red-100/50 to-rose-100/30' :
                    category === 'dicas' ? 'bg-gradient-to-br from-sky-100/50 to-blue-100/30' :
                    'bg-gradient-to-br from-gray-100/50 to-slate-100/30'
                  } opacity-50 pointer-events-none`}></div>
                  
                  <div className="flex items-center justify-between gap-2 sm:gap-3 relative z-10">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      {/* Icon */}
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 ${categoryIconColors[category]} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                          <h2 className={`text-lg sm:text-xl font-bold ${categoryTextColors[category]}`}>
                            {categoryLabels[category]}
                          </h2>
                          <span className={`text-xs sm:text-sm ${categoryTextColors[category]} opacity-75`}>
                            ({videos.length} {videos.length === 1 ? 'vídeo' : 'vídeos'})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid de vídeos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="youtube-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1&fs=1&cc_load_policy=1`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full"
                        ></iframe>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                          {video.title}
                        </h3>
                        {video.description && (
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                            {video.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          {video.channel && (
                            <span className="truncate">{video.channel}</span>
                          )}
                          {video.duration && (
                            <span className="ml-2 flex-shrink-0">{video.duration}</span>
                          )}
                        </div>
                        <a
                          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs bg-gradient-to-r from-sky-600 to-purple-600 text-white px-3 py-1.5 rounded-lg hover:from-sky-700 hover:to-purple-700 font-medium transition-all duration-200"
                        >
                          Assistir no YouTube
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}

