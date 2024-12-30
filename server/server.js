require('dotenv').config();

const getMoviesData = async(type) => {
  try {
    await fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.KEY}`)
    .then(res => res.json())
    .then(json => console.log(json))
  } catch(err) {
    console.error(err)
  };
};

export default getMoviesData; 