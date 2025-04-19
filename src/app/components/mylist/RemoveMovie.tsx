import { useRef } from "react";

interface RemoveMovieProps {
  movieId: number;
  onRemove: (movieId:number) => void;
}

function RemoveMovie({ movieId, onRemove }: RemoveMovieProps) {
  const userIdRef = useRef<string | null>(null);
  
  const getUserId = async () => {
    try {
    const res = await fetch("/api/isloggedin");
    const data = await res.json();
    if (res.ok && data.isLoggedIn) {
      userIdRef.current= data.userId;
    }
    } catch (err) {
      console.error("Error checking login: ", err)
    }
  }

  const handleRemoveMovie = () => {
    console.log("Removing movie with ID:", movieId);
    const removeMovie = async () => {
      await getUserId();
      
      if (!userIdRef.current || !movieId) {
        console.error("User ID or movie ID not available");
        return;
      }

      try {
        const res = await fetch("/api/movies", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            movieId: movieId, 
            userId: userIdRef.current,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to remove movie");
        }
        onRemove(movieId); // Uppdaterar listan för UI
      } catch (error) {
        console.error("Error removing movie:", error);
      }
    }
    removeMovie();
  }

  return (
    <button
      onClick={handleRemoveMovie}
      className="text-white-600 hover:text-red-700 w-fit text-2xl absolute"
    >
      &times;
    </button>
  );
}

export default RemoveMovie;