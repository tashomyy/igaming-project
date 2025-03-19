import { useEffect, useRef, useState } from "react";

import GameGrid from "../components/Homepage/GameGrid";
import useInfiniteGames from "../hooks/useInfiniteGames";

const Homepage = () => {
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    extraCategory: "",
    type: "",
    searchQuery: "",
    provider: "",
  });

  const { games, loading, loadMore } = useInfiniteGames(filters);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="container mx-auto">
      <h1 className="text-center my-5">Welcome to the iGaming App</h1>

      <input
        type="text"
        placeholder="Search by name..."
        className="border p-2 rounded w-full mb-4"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
        }
      />
      <input
        type="text"
        placeholder="Search by provider..."
        className="border p-2 rounded w-full mb-4"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, provider: e.target.value }))
        }
      />

      <GameGrid games={games} />

      <div ref={observerRef} className="h-10"></div>

      {loading && <p className="text-center mt-4">Loading more games...</p>}
    </div>
  );
};

export default Homepage;
