"use client";
import MovieCard from "./MovieCard";
import { useRef } from "react";

interface CategoryData {
  id: number;
  poster_path: string;
  original_title: string;
  release_date: string;
  vote_average: number;
}

interface MovieCarouselProp {
  categoryData: CategoryData[];
}

export default function MovieCarousel({categoryData}: MovieCarouselProp) {

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 300;
      if (carouselRef.current.scrollLeft === 0) {
        carouselRef.current.scrollLeft += carouselRef.current.scrollWidth;
      }
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 300;
      if (carouselRef.current.scrollLeft === (carouselRef.current.scrollWidth - carouselRef.current.clientWidth)) {
        carouselRef.current.scrollLeft -= carouselRef.current.scrollWidth;
      }
    }
  };

  return (
    <section className="relative flex items-center w-full">

      <button
        onClick={scrollLeft}
        className="absolute left-0 z-10 h-10 w-10 flex items-center justify-center bg-white text-black rounded-full shadow hover:scale-110 transition"
      >
        &lt;
      </button>

      <div 
        ref={carouselRef}
        className="flex mx-12 w-full overflow-x-scroll scroll-smooth whitespace-nowrap no-scrollbar gap-3"
      >
        {categoryData.map((movie ) => 
          <MovieCard 
            key={movie.id}
            moviePosterSrc={movie.poster_path}
            movieTitle={movie.original_title}
            releaseDate={movie.release_date}
            rating={movie.vote_average}
          />
        )}
      </div>
      
      <button
        onClick={scrollRight}
        className="absolute right-0 z-10 h-10 w-10 flex items-center justify-center bg-white text-black rounded-full shadow hover:scale-110 transition"
      >
        &gt;
      </button>
    </section>
  );
}