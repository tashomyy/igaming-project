import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGames, filterGames, loadMoreGames } from "../store/slices/games";
import { RootState } from "../store/store";
import { fetchGames } from "../services/games";

interface UseInfiniteGamesProps {
  searchQuery?: string;
}

const useInfiniteGames = ({ searchQuery }: UseInfiniteGamesProps) => {
  const dispatch = useDispatch();
  const { loadedGames, hasMore } = useSelector(
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
