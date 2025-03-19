import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState, useEffect } from "react";
import useInfiniteGames from "../hooks/useInfiniteGames";

const Homepage = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { games, loadMore, hasMore, loading } = useInfiniteGames({
    category,
    searchQuery,
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
    <>
      <h1 className="my-5 mx-2 text-center pt-12 primary-heading">
        Welcome to the iGaming project app
      </h1>
      <p className="text-center primary-body">
        Testing fetch data and error handling
      </p>

      <input
        type="text"
        placeholder="Search games..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 my-4 w-full"
      />

      <ErrorBoundary
        fallback={<div>Something went wrong with loading games</div>}
      >
        <Suspense fallback={<div>Loading games...</div>}>
          <div className="grid grid-cols-3 gap-4">
            {games.map((game) => (
              <div
                key={game.id}
                className="relative group overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={game.desktopThumbnail.url}
                  alt={game.name}
                  className="w-full h-80 object-cover transition-transform duration-300 transform group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-semibold text-lg">
                    {game.name}
                  </h3>
                  <p className="text-gray-300 text-sm">{game.provider}</p>
                </div>
              </div>
            ))}
          </div>
          {loading && <p>Loading more games...</p>}
          {!hasMore && <p>No more games to load</p>}
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Homepage;
