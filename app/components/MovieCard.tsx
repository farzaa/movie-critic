"use client";

import { Movie } from "../types";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Use ranking score if available, otherwise fall back to rating
  const score = movie.ranking?.chances_user_likes_movie || movie.rating * 10;

  // Determine color based on score (0-100)
  const getRatingColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-yellow-500";
    if (score >= 60) return "text-orange-500";
    return "text-red-500";
  };

  const getRatingBg = (score: number) => {
    if (score >= 90) return "bg-green-500/10 border-green-500/20";
    if (score >= 80) return "bg-yellow-500/10 border-yellow-500/20";
    if (score >= 60) return "bg-orange-500/10 border-orange-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200 dark:border-zinc-800">
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-600">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
          </div>
        )}
        <div
          className={`absolute top-3 right-3 ${getRatingBg(
            score
          )} backdrop-blur-sm px-3 py-1.5 rounded-full border flex items-center gap-1.5`}
        >
          <img
            src="/bot.png"
            alt="AI"
            className="w-5 h-5"
            style={{
              filter: score >= 90
                ? 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)' // green
                : score >= 80
                ? 'brightness(0) saturate(100%) invert(88%) sepia(79%) saturate(1352%) hue-rotate(3deg) brightness(104%) contrast(103%)' // yellow
                : score >= 60
                ? 'brightness(0) saturate(100%) invert(57%) sepia(98%) saturate(1000%) hue-rotate(360deg) brightness(100%) contrast(105%)' // orange
                : 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' // red
            }}
          />
          <span className={`text-lg font-bold ${getRatingColor(score)}`}>
            {score.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1 line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">
              {movie.genre}
            </span>
            <span>{movie.releaseDate}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-4 h-4 text-purple-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" />
            </svg>
            <span className="text-xs font-semibold text-purple-500 uppercase tracking-wide">
              AI Verdict
            </span>
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-300">
            <p className={isExpanded ? "" : "line-clamp-3"}>
              {movie.ranking?.verdict || movie.review}
            </p>
            {(movie.ranking?.verdict || movie.review).length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-xs mt-1 transition-colors"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        </div>

        {movie.showtimes && movie.showtimes.length > 0 && (
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <div className="flex items-center gap-1.5 mb-2">
              <svg
                className="w-4 h-4 text-zinc-500 dark:text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                Showtimes Today
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {movie.showtimes.slice(0, 4).map((showtime, index) => (
                <button
                  key={index}
                  className="px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded transition-colors"
                  title={showtime.format}
                >
                  {showtime.time}
                  {showtime.format !== "Standard" && (
                    <span className="ml-1 text-[10px] text-zinc-500 dark:text-zinc-500">
                      {showtime.format === "IMAX"
                        ? "IMAX"
                        : showtime.format === "Dolby Cinema"
                        ? "Dolby"
                        : showtime.format === "3D"
                        ? "3D"
                        : showtime.format === "IMAX 3D"
                        ? "IMAX"
                        : showtime.format === "70mm"
                        ? "70mm"
                        : ""}
                    </span>
                  )}
                </button>
              ))}
              {movie.showtimes.length > 4 && (
                <span className="px-2.5 py-1 text-xs text-zinc-500 dark:text-zinc-500">
                  +{movie.showtimes.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
