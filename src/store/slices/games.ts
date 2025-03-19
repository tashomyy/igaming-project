import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../../lib/types";

interface GamesState {
  games: Game[];
  currentIndex: number;
  hasMore: boolean;
}

const initialState: GamesState = {
  games: [],
  currentIndex: 0,
  hasMore: true,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    addGames: (state, action: PayloadAction<Game[]>) => {
      state.games.push(...action.payload);
      state.currentIndex += action.payload.length;
      if (action.payload.length === 0) state.hasMore = false;
    },
  },
});

export const { addGames } = gamesSlice.actions;
export default gamesSlice.reducer;
