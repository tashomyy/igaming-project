import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoriesState {
  activeCategory: string | null;
  availableCategories: string[];
}

const initialState: CategoriesState = {
  activeCategory: null,
  availableCategories: [],
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
    setAvailableCategories: (state, action: PayloadAction<string[]>) => {
      state.availableCategories = action.payload;
    },
  },
});

export const { setCategory, resetCategory, setAvailableCategories } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
