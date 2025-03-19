import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGames, filterGames, loadMoreGames } from "../store/slices/games";
import { fetchGames } from "../services/games";
import { RootState } from "../store/store";

interface UseInfiniteGamesProps {
  category?: string | null;
  searchQuery?: string;
}

const useInfiniteGames = ({ category, searchQuery }: UseInfiniteGamesProps) => {
  const dispatch = useDispatch();
  const { loadedGames, hasMore } = useSelector(
    (state: RootState) => state.games
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
    dispatch(filterGames({ category, searchQuery }));
  }, [category, searchQuery, dispatch]);

  const loadMore = useCallback(() => {
    if (hasMore) {
      dispatch(loadMoreGames());
    }
  }, [dispatch, hasMore]);

  return { games: loadedGames, loadMore, hasMore, loading };
};

export default useInfiniteGames;
