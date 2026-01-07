import MovieCard from "./components/MovieCard";
import scrapedMovies from "./data/scraped-movies.json";

export default function Home() {
  // Sort movies by ranking score (highest first)
  const movies = [...scrapedMovies].sort((a, b) => {
    const scoreA = a.ranking?.chances_user_likes_movie || 0;
    const scoreB = b.ranking?.chances_user_likes_movie || 0;
    return scoreB - scoreA;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white dark:text-zinc-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Farza's Critic
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium">AMC Lincoln Square, NYC</span>
              </div>
              <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-zinc-500 dark:text-zinc-500">
                AI predictions based on trailer analysis
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Now Playing
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-1">
            AI predictions tailored to Farza's taste in films
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-2">
            Scores show match % between each trailer (analyzed by Gemini vision AI) and Farza's taste profile
          </p>
          <details className="text-sm text-zinc-500 dark:text-zinc-500">
            <summary className="cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              How it works
            </summary>
            <ol className="mt-2 space-y-1 list-decimal list-inside text-zinc-600 dark:text-zinc-400">
              <li>BrowserBase scrapes upcoming movie trailers from theater websites</li>
              <li>Gemini 3 Pro analyzes each trailer frame-by-frame with visual understanding</li>
              <li>AI generates detailed analysis of genre, tone, themes, and cinematography</li>
              <li>Farza's taste profile (favorite films, themes, directors) is used as context</li>
              <li>Gemini predicts match percentage and provides personalized verdict</li>
              <li>Movies are ranked by predicted enjoyment score</li>
            </ol>
          </details>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

      </main>
    </div>
  );
}
