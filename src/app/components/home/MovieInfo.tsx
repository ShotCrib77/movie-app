import CastList from "./InfoList";
import AddToListSection from "./AddToListSection";
import InfoList from "./InfoList";
import InfoHeader from "./InfoHeader";
import TrailerIframe from "./TrailerIframe";

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

export default function MovieInfo({movieId, backdropPath, genresNameList, movieTitle, overview, runtime, voteAverage, releaseDate, videoKey, actorsNameList}: MovieInfoProps) {

  // Make it a 0-5 range instead of 0-10 and rounding to the nearest decimal value
  const roundedRating: number = Math.round((voteAverage/2) * 10) / 10;
  
  // Make the date only display year
  const releaseYear: string = releaseDate.split("-")[0]
  console.log("Video Key:", videoKey)

  // Reformat runtime to hours and minutes.
  const runtimeHours = (runtime/60);
  const fullHours = Math.floor(runtimeHours);
  const fullMinutes = Math.round((runtimeHours - fullHours)*60);
  const runtimeReformatted = (fullHours.toString() + "h " + fullMinutes.toString() + "m")

  // Reformating genres list to a string
  const genres = genresNameList.map(item => item).join(", ")

  return (
    <section className="flex justify-center my-3">
      <section className="relative flex flex-col justify-center p-6 sm:p-12 w-10/12 md:w-10/12 lg:w-8/12 xl:w-6/12 bg-container rounded-lg">

        <TrailerIframe videoKey={videoKey} />

        <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr]">
          <div className="flex flex-col w-10/12">
            <div className="flex flex-col md:flex-row md:items-center md:gap-3">
              
              <h1 className="font-bold text-2xl md:text-3xl my-2">{movieTitle}</h1>

              <div className="flex items-center gap-2 mb-2">
                <AddToListSection type="hw" movieId={movieId} />
                <AddToListSection type="wl" movieId={movieId} />
              </div>

            </div>

            <div className="flex gap-5">
              <InfoHeader info={releaseYear} />
              <InfoHeader info={runtimeReformatted} />
              <InfoHeader info={`${roundedRating}/5 ⭐`} />
            </div>

            <div className="my-4">
              <p className="text-md">{overview}</p>
            </div>

          </div>

          <div className="flex flex-col my-2 gap-2">
            <InfoList itemList={actorsNameList} itemType="Cast" />
            <InfoList itemList={genresNameList} itemType="Genres" />
          </div>

        </div>
      </section>
    </section>
  );
}