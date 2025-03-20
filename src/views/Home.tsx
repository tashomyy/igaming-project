import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState, useEffect } from "react";
import useInfiniteGames from "../hooks/useInfiniteGames";
import useDebounce from "../hooks/useDebounce";
import GameGrid from "../components/Homepage/GameGrid";
import Loader from "../components/UI/Loader";

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { games, loadMore, hasMore, loading } = useInfiniteGames({
    searchQuery: debouncedSearchQuery,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-highlight min-h-screen text-white">
      <div className="text-center pt-12 container">
        <h1 className="text-3xl md:text-5xl font-bold text-accent animate-[wiggle_1s_ease-in-out_infinite]">
          🐵 Welcome to the Monkey Gaming Zone! 🎮
        </h1>
        <p className="mt-3 text-lg text-warning">
          Play, Explore, and Have Fun with the Craziest Games!
        </p>
      </div>

      <div className="flex justify-center mt-5 container">
        <input
          type="text"
          placeholder="Search wild games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-3 rounded-xl text-black w-96 text-lg shadow-lg 
                     bg-accent focus:outline-none focus:ring-4 focus:ring-primary"
        />
      </div>

      <ErrorBoundary
        fallback={
          <div className="text-center text-red-500">Something went wrong</div>
        }
      >
        <Suspense fallback={<Loader />}>
          <GameGrid games={games} />
          {loading && <Loader />}
          {!hasMore && (
            <p className="text-center text-warning font-semibold mt-5">
              No more games found 🐵🎮
            </p>
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Homepage;
