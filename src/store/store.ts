import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categories";
import gamesReducer from "./slices/games";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    games: gamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
