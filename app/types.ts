export interface Showtime {
  time: string;
  format: string;
}

export interface Ranking {
  chances_user_likes_movie: number; // 0-100 percentage
  verdict: string; // Personalized explanation
}

export interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number; // AI prediction rating out of 10
  review: string; // AI review based on trailer
  posterUrl: string;
  releaseDate: string;
  mpaaRating?: string; // PG, PG-13, R, etc.
  showtimes: Showtime[];
  trailerUrl?: string; // YouTube trailer URL
  trailerAnalysis?: string; // Detailed AI analysis of the trailer
  ranking?: Ranking; // Personalized ranking based on user taste
}
