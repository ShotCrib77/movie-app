interface CategoryData {
  id: number;
  posterPath: string;
  movieTitle: string;
  releaseDate: string;
  voteAverage: number;
}

interface DataObject {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

interface DataListObject {
  movies: any[];
}

interface reformatDataParameter {
  data: DataObject;
}

interface MovieInfoProps {
  movieId: number;
  backdropPath: string;
  genresNameList: string[];
  movieTitle: string;
  overview: string;
  runtime: number;
  voteAverage: number;
  releaseDate: string;
  videoKey: string;
  actorsNameList: string[];
}

const reformatDataBrowse = (data: DataObject): CategoryData[] => {
  return (
    data.results.map(movie => ({
      id: movie.id,
      posterPath: movie.poster_path,
      movieTitle: movie.original_title,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    }))
  );
}

const reformatDataLists = (data: DataListObject): CategoryData[] => {
  return (
    data.movies.map(movie => ({
      id: movie.id,
      posterPath: movie.poster_path,
      movieTitle: movie.original_title,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    }))
  );
}

const reformatDataModal = (data: any): MovieInfoProps => {
  return (
    {
      movieId: data.id,
      backdropPath: data.backdrop_path,
      genresNameList: data.genres.map((genre: any) => genre.name),
      movieTitle: data.original_title,
      overview: data.overview,
      runtime: data.runtime,
      voteAverage: data.vote_average,
      releaseDate: data.release_date,
      videoKey: data.trailer?.key,
      actorsNameList: data.credits?.cast
        .filter((actor: any) => actor.known_for_department === "Acting")
        .map((actor: any) => actor.name) || [],
    }
  );
}

export { reformatDataBrowse, reformatDataModal, reformatDataLists }