const getMoviesDataWithGenreId = async(genreId) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=9b03d3c397de751f9667ad17b7e3c57e&with_genres=${genreId}`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
      return null
    }

    const json = await res.json()
    console.log(json);
    return json;
    
  } catch(err) {
    console.error("Error when getting movie data with genre id", err)
    return null;
  };
};

const getMovieData = async (id) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9b03d3c397de751f9667ad17b7e3c57e&append_to_response=videos,credits`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const json = await res.json();

    // Extract video key
    const videoKey = (json.videos?.results || [])
      .filter(video => video.type === "Trailer" && video.site === "YouTube")
      .map(video => video.key)[0] || "";

    // Extract actors name
    const actorsNameList = (json.credits?.cast || [])
      .filter(actor => actor.known_for_department === "Acting")
      .map(actor => actor.name);

    // Extract genres name
    const genresNameList = (json.genres || []).map(genre => genre.name);

    console.log(json);

    return {
      ...json,
      videoKey,
      actorsNameList,
      genresNameList,
    };

  } catch (err) {
    console.error(err);
    return null;
  }
}

export { getMoviesDataWithGenreId, getMovieData };