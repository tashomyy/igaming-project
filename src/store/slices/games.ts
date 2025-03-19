import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../../lib/types";

interface GamesState {
  allGames: Game[];
  displayedGames: Game[];
  loadedGames: Game[];
  hasMore: boolean;
}

const initialState: GamesState = {
  allGames: [],
  displayedGames: [],
  loadedGames: [],
  hasMore: true,
};

const GAMES_BATCH_SIZE = 20;

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<Game[]>) => {
      state.allGames = action.payload;
      state.displayedGames = action.payload;
      state.loadedGames = action.payload.slice(0, GAMES_BATCH_SIZE);
      state.hasMore = action.payload.length > GAMES_BATCH_SIZE;
    },
    filterGames: (
      state,
      action: PayloadAction<{ category?: string | null; searchQuery?: string }>
    ) => {
      const { category, searchQuery } = action.payload;

      let filteredGames = state.allGames;

      // Apply category filters
      if (category) {
        filteredGames = filteredGames.filter(
          (game) =>
            game.category === category ||
            game.subCategory === category ||
            game.extraCategories.includes(category) ||
            game.type === category
        );
      }

      // Apply search query
      if (searchQuery) {
        filteredGames = filteredGames.filter(
          (game) =>
            game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            game.provider.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      state.displayedGames = filteredGames;
      state.loadedGames = filteredGames.slice(0, GAMES_BATCH_SIZE);
      state.hasMore = filteredGames.length > GAMES_BATCH_SIZE;
    },
    loadMoreGames: (state) => {
      const currentLength = state.loadedGames.length;
      const nextGames = state.displayedGames.slice(
        currentLength,
        currentLength + GAMES_BATCH_SIZE
      );

      state.loadedGames = [...state.loadedGames, ...nextGames];
      if (state.loadedGames.length >= state.displayedGames.length) {
        state.hasMore = false;
      }
    },
  },
});

export const { setGames, filterGames, loadMoreGames } = gamesSlice.actions;
export default gamesSlice.reducer;
