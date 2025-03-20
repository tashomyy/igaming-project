import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGames, filterGames, loadMoreGames } from "../store/slices/games";
import { RootState } from "../store/store";
import { fetchGames } from "../services/games";
import { setAvailableCategories } from "../store/slices/categories";
import { Game } from "../lib/types";

interface UseInfiniteGamesProps {
  searchQuery?: string;
}

const useInfiniteGames = ({ searchQuery }: UseInfiniteGamesProps) => {
  const dispatch = useDispatch();
  const { loadedGames, hasMore, allGames } = useSelector(
    (state: RootState) => state.games
  );
  const activeCategory = useSelector(
    (state: RootState) => state.categories.activeCategory
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllGames = async () => {
      setLoading(true);
      const games = await fetchGames();
      dispatch(setGames(games));

      const activeCategories = new Set<string>();
      games.forEach((game: Game) => {
        if (game.type) activeCategories.add(game.type);
        if (game.category) activeCategories.add(game.category);
        if (game.subCategory) activeCategories.add(game.subCategory);
        if (game.extraCategories) {
          game.extraCategories
            .split(",")
            .forEach((extra) => activeCategories.add(extra.trim()));
        }
      });

      dispatch(setAvailableCategories(Array.from(activeCategories)));
      setLoading(false);
    };

    fetchAllGames();
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterGames({ category: activeCategory, searchQuery }));
  }, [activeCategory, searchQuery, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory]);

  const loadMore = useCallback(() => {
    if (hasMore) {
      dispatch(loadMoreGames());
    }
  }, [dispatch, hasMore]);

  return { games: loadedGames, loadMore, hasMore, loading };
};

export default useInfiniteGames;
