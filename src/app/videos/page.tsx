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

const categoryColors: Record<RecommendedVideo['category'], string> = {
  'técnica': 'bg-blue-100 text-blue-700 border-blue-200',
  'estratégia': 'bg-purple-100 text-purple-700 border-purple-200',
  'drills': 'bg-orange-100 text-orange-700 border-orange-200',
  'partidas': 'bg-green-100 text-green-700 border-green-200',
  'dicas': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'outros': 'bg-gray-100 text-gray-700 border-gray-200',
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
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Vídeos Recomendados
        </h1>
        <p className="text-gray-700 text-base max-w-3xl leading-relaxed">
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
        <div className="space-y-12">
          {categories.map((category) => {
            const videos = videosByCategory[category] || [];
            if (videos.length === 0) return null;

            return (
              <section key={category} className="mb-10">
                <div className="mb-6 pb-3 border-b border-gray-300">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded text-xs font-semibold border ${categoryColors[category]}`}>
                      {categoryLabels[category]}
                    </span>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {categoryLabels[category]}
                    </h2>
                    <span className="text-sm text-gray-500">
                      ({videos.length} {videos.length === 1 ? 'vídeo' : 'vídeos'})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
                    >
                      <div className="youtube-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1&fs=1&cc_load_policy=1`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
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
                        <div className="flex items-center justify-between text-xs text-gray-500">
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
                          className="mt-3 inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium"
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
    </div>
  );
}

