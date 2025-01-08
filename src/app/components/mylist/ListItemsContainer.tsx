import ListItem from "./ListItem";
import { reformatDataBrowse} from "@/app/functions/functions";

interface ListItemsContainerProp {
  listType: "Have Watched" | "Watch Later";
}

interface CategoryData {
  id: number;
  posterPath: string;
  movieTitle: string;
  releaseDate: string;
  voteAverage: number;
}

// Real case you get data with ids -
  //const movieIds: number[] = [1231, 1903, 1032, 2240]

const movies = {
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg",
      "genre_ids": [
        28,
        12,
        18
      ],
      "id": 558449,
      "original_language": "en",
      "original_title": "Gladiator II",
      "overview": "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist. With rage in his heart and the future of the Empire at stake, Lucius must look to his past to find strength and honor to return the glory of Rome to its people.",
      "popularity": 5382.147,
      "poster_path": "/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
      "release_date": "2024-11-05",
      "title": "Gladiator II",
      "video": false,
      "vote_average": 6.759,
      "vote_count": 1850
    },
    {
      "adult": false,
      "backdrop_path": "/2C4js9DGb3GzoZeef1ZzhSGLXRO.jpg",
      "genre_ids": [
          10749,
          18
      ],
      "id": 1156593,
      "original_language": "es",
      "original_title": "Culpa tuya",
      "overview": "The love between Noah and Nick seems unwavering despite their parents' attempts to separate them. But his job and her entry into college open up their lives to new relationships that will shake the foundations of both their relationship and the Leister family itself.",
      "popularity": 5236.256,
      "poster_path": "/1sQA7lfcF9yUyoLYC0e6Zo3jmxE.jpg",
      "release_date": "2024-12-26",
      "title": "Your Fault",
      "video": false,
      "vote_average": 7.145,
      "vote_count": 543
    },
    {
      "adult": false,
      "backdrop_path": "/cjEcqdRdPQJhYre3HUAc5538Gk8.jpg",
      "genre_ids": [
          28,
          14,
          35
      ],
      "id": 845781,
      "original_language": "en",
      "original_title": "Red One",
      "overview": "After Santa Claus (codename: Red One) is kidnapped, the North Pole's Head of Security must team up with the world's most infamous tracker in a globe-trotting, action-packed mission to save Christmas.",
      "popularity": 3805.408,
      "poster_path": "/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg",
      "release_date": "2024-10-31",
      "title": "Red One",
      "video": false,
      "vote_average": 7.036,
      "vote_count": 1741
    },
    {
      "adult": false,
      "backdrop_path": "/3sh2UA2Q2l7fihgoj1LhFFPTlIM.jpg",
      "genre_ids": [
          28,
          878,
          12,
          53
      ],
      "id": 912649,
      "original_language": "en",
      "original_title": "Venom: The Last Dance",
      "overview": "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      "popularity": 3527.162,
      "poster_path": "/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
      "release_date": "2024-10-22",
      "title": "Venom: The Last Dance",
      "video": false,
      "vote_average": 6.794,
      "vote_count": 2069
    },
  ],
  "total_pages": 47979,
  "total_results": 959566
}

const reformattedMovieData: CategoryData[] = reformatDataBrowse(movies);

export default function ListItemsContainer({listType}: ListItemsContainerProp) {
  return (
    <section className="w-full flex flex-col items-center gap-4 justify-center">

      {reformattedMovieData.map((movie) => 
        <ListItem 
          key={movie.id}
          listType={listType}
          priority={"High"}
          movieId={movie.id}
          posterPath={movie.posterPath}
          movieTitle={movie.movieTitle}
          releaseDate={movie.releaseDate} 
          rating={movie.voteAverage}  
        />
      )}
    </section>
  );
}