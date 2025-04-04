"use client";
import MovieCard from "./MovieCard";
import ArrowButton from "./ArrowButton";
import { useRef } from "react";

interface CategoryData {
  id: number;
  posterPath: string;
  movieTitle: string;
  releaseDate: string;
  voteAverage: number;
}

interface MovieCarouselProp {
  categoryData: CategoryData[];
  openModal: (id: number) => void;
}

export default function MovieCarousel({categoryData, openModal}: MovieCarouselProp) {

  const carouselRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount: number = carouselRef.current.clientWidth < 768 ? 125 : carouselRef.current.clientWidth < 1024 ? 200 : 500;
      carouselRef.current.scrollLeft -= scrollAmount;
      if (carouselRef.current.scrollLeft === 0) {
        carouselRef.current.scrollLeft += carouselRef.current.scrollWidth;
      }
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount: number = carouselRef.current.clientWidth < 768 ? 100 : carouselRef.current.clientWidth < 1024 ? 200 : 300;
      carouselRef.current.scrollLeft += scrollAmount;
      if (carouselRef.current.scrollLeft === (carouselRef.current.scrollWidth - carouselRef.current.clientWidth)) {
        carouselRef.current.scrollLeft -= carouselRef.current.scrollWidth;
      }
    }
  };

  return (
    <section className="relative flex items-center w-full">
      <ArrowButton direction="left" scrollFunc={scrollLeft} />

      <div 
        ref={carouselRef}
        className="flex mx-12 w-full overflow-x-scroll scroll-smooth whitespace-nowrap no-scrollbar gap-3"
      >
        {categoryData.map((movie ) => 
          <MovieCard
            key={movie.id}
            id={movie.id}
            moviePosterSrc={movie.posterPath}
            movieTitle={movie.movieTitle}
            releaseDate={movie.releaseDate}
            rating={movie.voteAverage}
            onClick={openModal}
          />
        )}
      </div>
      
      <ArrowButton direction="right" scrollFunc={scrollRight} />
    </section>
  );
}