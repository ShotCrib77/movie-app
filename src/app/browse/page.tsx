"use client";
import { useEffect, useState } from "react";
import MovieRollerCoaster from "../components/home/MovieCarousel";
import CategoryHeader from "../components/general/CategoryHeader";
import Modal from "../components/general/modal/Modal";
import MovieModal from "../components/home/MovieModal";
import { reformatDataBrowse } from "../functions/functions";
import { TMDBMovie } from "../lib/Types";

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

export default function Browse() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

    const [actionData, setActionData] = useState<CategoryData[] | null>(null);
    const [dramaData, setDramaData] = useState<CategoryData[] | null>(null);
    const [discoverData, setDiscoverData] = useState<CategoryData[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null);

    const openModal = (id: number) => {
        console.log("ID:", id)
        setSelectedMovieId(id);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovieId(null);
    }; 

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const [discover, action, drama] = await Promise.all([
                    getAndReformatData("28"),
                    getAndReformatData("12"),
                    getAndReformatData("35"),
                ]);
                 setDiscoverData(discover)
                 setActionData(action)
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
                        <CategoryHeader categoryName="Trending" />
                        <MovieRollerCoaster categoryData={discoverData!} openModal={openModal} />
                    </div>
                    
                    <div className="flex flex-col my-5 md:my-8 lg:my-12">
                        <CategoryHeader categoryName="Drama" />
                        <MovieRollerCoaster categoryData={dramaData!} openModal={openModal} />
                    </div>

                    <div className="flex flex-col my-5 md:my-8 lg:my-12">
                        <CategoryHeader categoryName="Action" />
                        <MovieRollerCoaster categoryData={actionData!} openModal={openModal} />
                    </div>

                    <Modal isOpen={isModalOpen} handleClose={closeModal}>
                        {selectedMovieId && <MovieModal movieId={selectedMovieId} />}
                    </Modal>
                </section>
            )}
        </>
    );
}