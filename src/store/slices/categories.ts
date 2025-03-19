import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoriesState {
  activeCategory: string | null;
}

const initialState: CategoriesState = {
  activeCategory: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.activeCategory = action.payload;
    },
    resetCategory: (state) => {
      state.activeCategory = null;
    },
  },
});

export const { setCategory, resetCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
