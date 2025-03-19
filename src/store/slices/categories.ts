import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../lib/types";

interface CategoriesState {
  categories: Record<string, Category[]>;
}

const initialState: CategoriesState = {
  categories: {},
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateCategories: (
      state,
      action: PayloadAction<Record<string, Category[]>>
    ) => {
      state.categories = action.payload;
    },
  },
});

export const { updateCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
