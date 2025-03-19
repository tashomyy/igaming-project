import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState, useEffect } from "react";
import useInfiniteGames from "../hooks/useInfiniteGames";
import GameGrid from "../components/Homepage/GameGrid";
import useDebounce from "../hooks/useDebounce";

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
    <div className="container">
      <input
        type="text"
        placeholder="Search games..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 my-4 w-full"
      />

      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <GameGrid games={games} />
          {loading && <p>Loading more...</p>}
          {!hasMore && <p>No more games.</p>}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Homepage;
