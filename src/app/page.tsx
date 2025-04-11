"use client";
import { useEffect, useState } from "react";
import MovieCarousel from "./components/home/MovieCarousel";
import CategoryHeader from "./components/general/CategoryHeader";
import Modal from "./components/general/modal/Modal";
import MovieModal from "./components/home/MovieModal";
import { reformatDataBrowse } from "./functions/functions";

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

const getAndReformatData = async (genreId: string): Promise<CategoryData[]> => {
    try {
        const res = await fetch(`/api/tmdb/browse?genreId=${genreId}`);
        return reformatDataBrowse(await res.json())
    } catch (err) {
        console.error(`Error fetching category ${genreId} browse data`, err)
        return [];
    }
};

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

    const [actionData, setActionData] = useState<CategoryData[] | null>(null);
    const [dramaData, setDramaData] = useState<CategoryData[] | null>(null);
    const [animationData, setAnimationData] = useState<CategoryData[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null);

    const openModal = (id: number) => {
        console.log("ID:", id)
        setSelectedMovieId(id);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        console.log("Triggered closeModal")
        setIsModalOpen(false);
        setSelectedMovieId(null);
    }; 

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const [action, animation, drama] = await Promise.all([
                    getAndReformatData("28"),
                    getAndReformatData("16"),
                    getAndReformatData("18"),
                ]);
                  setActionData(action)
                 setAnimationData(animation)
                 setDramaData(drama)
            } catch (err) {
                console.error("Error fetching browse data", err)
                setError("Failed to load movie data.")
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovieData();
    }, []);

    return (
        <>
            {isLoading ? (<p>Loading...</p>) : (
                <section>
                    <div className="flex flex-col my-5 md:my-8 lg:my-12">
                        <CategoryHeader categoryName="Action" />
                        <MovieCarousel categoryData={actionData!} openModal={openModal} />
                    </div>
                    
                    <div className="flex flex-col my-5 md:my-8 lg:my-12">
                        <CategoryHeader categoryName="Animated" />
                        <MovieCarousel categoryData={animationData!} openModal={openModal} />
                    </div>

                    <div className="flex flex-col my-5 md:my-8 lg:my-12">
                        <CategoryHeader categoryName="Drama" />
                        <MovieCarousel categoryData={dramaData!} openModal={openModal} />
                    </div>

                    <Modal isOpen={isModalOpen} handleClose={closeModal}>
                        {selectedMovieId && <MovieModal movieId={selectedMovieId} />}
                    </Modal>
                </section>
            )}
        </>
    );
}