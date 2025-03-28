export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  tagline: string;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  status: string;
  popularity: number;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  videos?: {
    results: {
      id: string;
      key: string;
      site: string;
      type: string;
      official: boolean;
      published_at: string;
    }[];
  };
  credits?: {
    cast: {
      cast_id: number;
      character: string;
      credit_id: string;
      gender: number | null;
      id: number;
      name: string;
      order: number;
      profile_path: string | null;
    }[];
    crew: {
      credit_id: string;
      department: string;
      gender: number | null;
      id: number;
      job: string;
      name: string;
      profile_path: string | null;
    }[];
  };
}
