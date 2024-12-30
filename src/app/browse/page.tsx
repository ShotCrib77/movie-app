import MovieRollerCoaster from "../components/browse/MovieCarousel";
import CategoryHeader from "../components/general/CategoryHeader";

interface CategoryData {
  id: number;
  poster_path: string;
  original_title: string;
  release_date: string;
  vote_average: number;
}

const testData: any[] =
[
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
      "popularity": 5872.166,
      "poster_path": "/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
      "release_date": "2024-11-05",
      "title": "Gladiator II",
      "video": false,
      "vote_average": 6.775,
      "vote_count": 1570
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
      "popularity": 4760.061,
      "poster_path": "/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg",
      "release_date": "2024-10-31",
      "title": "Red One",
      "video": false,
      "vote_average": 7.0,
      "vote_count": 1540
  },
  {
      "adult": false,
      "backdrop_path": "/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
      "genre_ids": [
          28,
          878,
          35,
          10751
      ],
      "id": 939243,
      "original_language": "en",
      "original_title": "Sonic the Hedgehog 3",
      "overview": "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.",
      "popularity": 4338.285,
      "poster_path": "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
      "release_date": "2024-12-19",
      "title": "Sonic the Hedgehog 3",
      "video": false,
      "vote_average": 7.7,
      "vote_count": 174
  },
  {
      "adult": false,
      "backdrop_path": "/6qld2YxAO9gdEblo0rsEb8BcYKO.jpg",
      "genre_ids": [
          10749,
          18
      ],
      "id": 1156593,
      "original_language": "es",
      "original_title": "Culpa tuya",
      "overview": "The love between Noah and Nick seems unwavering despite their parents' attempts to separate them. But his job and her entry into college open up their lives to new relationships that will shake the foundations of both their relationship and the Leister family itself.",
      "popularity": 3958.479,
      "poster_path": "/1sQA7lfcF9yUyoLYC0e6Zo3jmxE.jpg",
      "release_date": "2024-12-26",
      "title": "Your Fault",
      "video": false,
      "vote_average": 7.7,
      "vote_count": 232
  },
  {
      "adult": false,
      "backdrop_path": "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
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
      "popularity": 3789.621,
      "poster_path": "/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
      "release_date": "2024-10-22",
      "title": "Venom: The Last Dance",
      "video": false,
      "vote_average": 6.8,
      "vote_count": 1935
  },
  {
      "adult": false,
      "backdrop_path": "/oHPoF0Gzu8xwK4CtdXDaWdcuZxZ.jpg",
      "genre_ids": [
          12,
          10751,
          18,
          16
      ],
      "id": 762509,
      "original_language": "en",
      "original_title": "Mufasa: The Lion King",
      "overview": "Told in flashbacks, Mufasa is an orphaned cub, lost and alone until he meets a sympathetic lion named Taka—the heir to a royal bloodline. The chance meeting sets in motion a journey of misfits searching for their destiny and working together to evade a threatening and deadly foe.",
      "popularity": 2888.542,
      "poster_path": "/9bXHaLlsFYpJUutg4E6WXAjaxDi.jpg",
      "release_date": "2024-12-18",
      "title": "Mufasa: The Lion King",
      "video": false,
      "vote_average": 7.2,
      "vote_count": 282
  },
  {
      "adult": false,
      "backdrop_path": "/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg",
      "genre_ids": [
          16,
          12,
          10751,
          35
      ],
      "id": 1241982,
      "original_language": "en",
      "original_title": "Moana 2",
      "overview": "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
      "popularity": 2845.684,
      "poster_path": "/m0SbwFNCa9epW1X60deLqTHiP7x.jpg",
      "release_date": "2024-11-21",
      "title": "Moana 2",
      "video": false,
      "vote_average": 7.0,
      "vote_count": 637
  },
  {
      "adult": false,
      "backdrop_path": "/lntyt4OVDbcxA1l7LtwITbrD3FI.jpg",
      "genre_ids": [
          10749,
          18
      ],
      "id": 1010581,
      "original_language": "es",
      "original_title": "Culpa mía",
      "overview": "Noah must leave her city, boyfriend, and friends to move into William Leister's mansion, the flashy and wealthy husband of her mother Rafaela. As a proud and independent 17 year old, Noah resists living in a mansion surrounded by luxury. However, it is there where she meets Nick, her new stepbrother, and the clash of their strong personalities becomes evident from the very beginning.",
      "popularity": 2292.349,
      "poster_path": "/w46Vw536HwNnEzOa7J24YH9DPRS.jpg",
      "release_date": "2023-06-08",
      "title": "My Fault",
      "video": false,
      "vote_average": 7.917,
      "vote_count": 3214
  },
  {
      "adult": false,
      "backdrop_path": "/rhc8Mtuo3Kh8CndnlmTNMF8o9pU.jpg",
      "genre_ids": [
          28,
          53
      ],
      "id": 1005331,
      "original_language": "en",
      "original_title": "Carry-On",
      "overview": "An airport security officer races to outsmart a mysterious traveler forcing him to let a dangerous item slip onto a Christmas Eve flight.",
      "popularity": 2066.207,
      "poster_path": "/sjMN7DRi4sGiledsmllEw5HJjPy.jpg",
      "release_date": "2024-12-05",
      "title": "Carry-On",
      "video": false,
      "vote_average": 7.0,
      "vote_count": 1137
  },
  {
      "adult": false,
      "backdrop_path": "/dWkdmxIkH9y23s9v1PjQFhTGIwo.jpg",
      "genre_ids": [
          28,
          18,
          53
      ],
      "id": 1043905,
      "original_language": "en",
      "original_title": "Dirty Angels",
      "overview": "During the United States' 2021 withdrawal from Afghanistan, a group of female soldiers posing as medical relief are sent back in to rescue a group of kidnapped teenagers caught between ISIS and the Taliban.",
      "popularity": 1900.243,
      "poster_path": "/3O3qSGmjRGc10hMwFul8WDxKE5t.jpg",
      "release_date": "2024-12-11",
      "title": "Dirty Angels",
      "video": false,
      "vote_average": 6.5,
      "vote_count": 55
  },
  {
      "adult": false,
      "backdrop_path": "/6lE2e6j8qbtQR8aHxQNJlwxdmKV.jpg",
      "genre_ids": [
          28,
          80,
          53
      ],
      "id": 974453,
      "original_language": "en",
      "original_title": "Absolution",
      "overview": "An aging ex-boxer gangster working as muscle for a Boston crime boss receives an upsetting diagnosis.  Despite a faltering memory, he attempts to rectify the sins of his past and reconnect with his estranged children. He is determined to leave a positive legacy for his grandson, but the criminal underworld isn’t done with him and won’t loosen their grip willingly.",
      "popularity": 1574.973,
      "poster_path": "/2MeQG5Vq8rUnRAa463BZe5GNhVk.jpg",
      "release_date": "2024-10-31",
      "title": "Absolution",
      "video": false,
      "vote_average": 6.086,
      "vote_count": 185
  },
  {
      "adult": false,
      "backdrop_path": "/au3o84ub27qTZiMiEc9UYzN74V3.jpg",
      "genre_ids": [
          28,
          878,
          53
      ],
      "id": 1035048,
      "original_language": "en",
      "original_title": "Elevation",
      "overview": "A single father and two women venture from the safety of their homes to face monstrous creatures to save the life of a young boy.",
      "popularity": 1534.174,
      "poster_path": "/uQhYBxOVFU6s9agD49FnGHwJqG5.jpg",
      "release_date": "2024-11-07",
      "title": "Elevation",
      "video": false,
      "vote_average": 6.29,
      "vote_count": 205
  },
  {
      "adult": false,
      "backdrop_path": "/sQbFupSWM9wUdPj96NZNUOFSP5.jpg",
      "genre_ids": [
          28,
          12,
          53
      ],
      "id": 1000075,
      "original_language": "fr",
      "original_title": "Largo Winch: Le prix de l'argent",
      "overview": "Largo Winch, devastated by the kidnapping of his son, realizes that if he finds those responsible for his bankruptcy, maybe he'll see his son again.",
      "popularity": 1046.832,
      "poster_path": "/myS41ZUmFvslkT8LeD2irAKxyrf.jpg",
      "release_date": "2024-07-31",
      "title": "The Price of Money: A Largo Winch Adventure",
      "video": false,
      "vote_average": 5.805,
      "vote_count": 64
  },
  {
      "adult": false,
      "backdrop_path": "/9mJ9dxCGpudxyBtlC0M9Y4pTyXN.jpg",
      "genre_ids": [
          16,
          28,
          878,
          10751
      ],
      "id": 1184918,
      "original_language": "en",
      "original_title": "The Wild Robot",
      "overview": "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
      "popularity": 977.514,
      "poster_path": "/9w0Vh9eizfBXrcomiaFWTIPdboo.jpg",
      "release_date": "2024-09-08",
      "title": "The Wild Robot",
      "video": false,
      "vote_average": 8.38,
      "vote_count": 3681
  },
  {
      "adult": false,
      "backdrop_path": "/t98L9uphqBSNn2Mkvdm3xSFCQyi.jpg",
      "genre_ids": [
          27,
          878
      ],
      "id": 933260,
      "original_language": "en",
      "original_title": "The Substance",
      "overview": "A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.",
      "popularity": 849.339,
      "poster_path": "/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
      "release_date": "2024-09-07",
      "title": "The Substance",
      "video": false,
      "vote_average": 7.2,
      "vote_count": 2815
  },
  {
      "adult": false,
      "backdrop_path": "/v9Du2HC3hlknAvGlWhquRbeifwW.jpg",
      "genre_ids": [
          28,
          12,
          53
      ],
      "id": 539972,
      "original_language": "en",
      "original_title": "Kraven the Hunter",
      "overview": "Kraven Kravinoff's complex relationship with his ruthless gangster father, Nikolai, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.",
      "popularity": 825.215,
      "poster_path": "/i47IUSsN126K11JUzqQIOi1Mg1M.jpg",
      "release_date": "2024-12-11",
      "title": "Kraven the Hunter",
      "video": false,
      "vote_average": 5.9,
      "vote_count": 225
  },
  {
      "adult": false,
      "backdrop_path": "/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
      "genre_ids": [
          28,
          35,
          878
      ],
      "id": 533535,
      "original_language": "en",
      "original_title": "Deadpool & Wolverine",
      "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
      "popularity": 819.043,
      "poster_path": "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
      "release_date": "2024-07-24",
      "title": "Deadpool & Wolverine",
      "video": false,
      "vote_average": 7.658,
      "vote_count": 6082
  },
  {
      "adult": false,
      "backdrop_path": "/xlkclSE4aq7r3JsFIJRgs21zUew.jpg",
      "genre_ids": [
          27,
          53
      ],
      "id": 1034541,
      "original_language": "en",
      "original_title": "Terrifier 3",
      "overview": "Five years after surviving Art the Clown's Halloween massacre, Sienna and Jonathan are still struggling to rebuild their shattered lives. As the holiday season approaches, they try to embrace the Christmas spirit and leave the horrors of the past behind. But just when they think they're safe, Art returns, determined to turn their holiday cheer into a new nightmare. The festive season quickly unravels as Art unleashes his twisted brand of terror, proving that no holiday is safe.",
      "popularity": 805.93,
      "poster_path": "/ju10W5gl3PPK3b7TjEmVOZap51I.jpg",
      "release_date": "2024-10-09",
      "title": "Terrifier 3",
      "video": false,
      "vote_average": 6.9,
      "vote_count": 1311
  },
  {
      "adult": false,
      "backdrop_path": "/h3fwlwHotd3JfV13HdW0mxDcxPD.jpg",
      "genre_ids": [
          35,
          10749
      ],
      "id": 957119,
      "original_language": "en",
      "original_title": "Sidelined: The QB and Me",
      "overview": "Dallas, a burdened but headstrong dancer, is determined to get into the best dance school in the country—her late mother’s alma mater. However, that dream is suddenly derailed when the cheeky yet secretly grieving football star, Drayton, crashes into her life with a unique story of his own. Will the two of them be able to grow into their dreams together, or will their dreams be sidelined?",
      "popularity": 793.871,
      "poster_path": "/kWSfmkKs3i62k5iFzmdut0xudGk.jpg",
      "release_date": "2024-11-29",
      "title": "Sidelined: The QB and Me",
      "video": false,
      "vote_average": 6.2,
      "vote_count": 84
  },
  {
      "adult": false,
      "backdrop_path": "/4cp40IyTpFfsT2IKpl0YlUkMBIR.jpg",
      "genre_ids": [
          10749,
          35,
          18
      ],
      "id": 1064213,
      "original_language": "en",
      "original_title": "Anora",
      "overview": "A young sex worker from Brooklyn gets her chance at a Cinderella story when she meets and impulsively marries the son of an oligarch. Once the news reaches Russia, her fairytale is threatened as his parents set out to get the marriage annulled.",
      "popularity": 784.917,
      "poster_path": "/7MrgIUeq0DD2iF7GR6wqJfYZNeC.jpg",
      "release_date": "2024-10-14",
      "title": "Anora",
      "video": false,
      "vote_average": 7.1,
      "vote_count": 544
  }
];

const reformattedData: CategoryData[] = testData.map(item => ({
  id: item.id,
  poster_path: item.poster_path,
  original_title: item.original_title,
  release_date: item.release_date,
  vote_average: item.vote_average
}));

export default function Mylist() {
  return (
    <section className="">
      <div className="flex flex-col my-12">
        <CategoryHeader categoryName="Trending" />
        <MovieRollerCoaster categoryData={reformattedData} />
      </div>
      
      <div className="flex flex-col my-12">
        <CategoryHeader categoryName="Because you liked Dexter" />
        <MovieRollerCoaster categoryData={reformattedData} />
      </div>

      <div className="flex flex-col my-12">
        <CategoryHeader categoryName="Action" />
        <MovieRollerCoaster categoryData={reformattedData} />
      </div>
    </section>
  );
}