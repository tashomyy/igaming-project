import { useState, useEffect } from "react";
import { Game } from "../lib/types";
import { fetchGames } from "../services/games";
import { useErrorBoundary } from "react-error-boundary";

interface GameState {
  games: Game[];
  loadedGames: number;
}

const GAMES_PER_LOAD = 20;

const useInfiniteGames = (filters: {
  category?: string;
  subCategory?: string;
  extraCategory?: string;
  type?: string;
  searchQuery?: string;
  provider?: string;
}) => {
  const [gameData, setGameData] = useState<GameState>({
    games: [],
    loadedGames: 0,
  });
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        setLoading(true);
        const data = await fetchGames();
        setAllGames(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error("Something went wrong");
      }
    };

    fetchAllGames();
  }, []);

  useEffect(() => {
    if (allGames.length === 0) return;

    const filteredGames = allGames.filter((game) => {
      const matchesCategory = filters.category
        ? game.category === filters.category
        : true;
      const matchesSubCategory = filters.subCategory
        ? game.subCategory === filters.subCategory
        : true;
      const matchesExtraCategory = filters.extraCategory
        ? game.extraCategories === filters.extraCategory
        : true;
      const matchesType = filters.type ? game.type === filters.type : true;
      const matchesSearch = filters.searchQuery
        ? game.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
        : true;
      const matchesProvider = filters.provider
        ? game.provider.toLowerCase().includes(filters.provider.toLowerCase())
        : true;

      return (
        matchesCategory &&
        matchesSubCategory &&
        matchesExtraCategory &&
        matchesType &&
        matchesSearch &&
        matchesProvider
      );
    });

    setGameData({
      games: filteredGames.slice(0, GAMES_PER_LOAD),
      loadedGames: GAMES_PER_LOAD,
    });
  }, [allGames, filters]);

  const loadMore = () => {
    if (loading) return;

    setGameData((prev) => ({
      games: [
        ...prev.games,
        ...allGames.slice(prev.loadedGames, prev.loadedGames + GAMES_PER_LOAD),
      ],
      loadedGames: prev.loadedGames + GAMES_PER_LOAD,
    }));
  };

  return { games: gameData.games, loading, loadMore };
};

export default useInfiniteGames;
