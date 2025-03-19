import { toast } from "react-toastify";
import { apiClient } from "./apiClient";
import { Game, Category } from "../lib/types";

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get(`game-categories/extended.json`);
    return response.data;
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "There was an error while fetching the categories"
    );
    throw new Error(
      error?.response?.data?.message || "Failed to fetch categories"
    );
  }
};

let categoryIdCounter = 1; // Ensures unique category IDs

export const extractCategoriesFromGames = (
  games: Game[]
): Record<string, Category[]> => {
  return games.reduce((acc: Record<string, Category[]>, game: Game) => {
    const addCategory = (
      type: "type" | "category" | "subCategory" | "tags" | "extraCategories",
      slug: string
    ) => {
      if (!acc[type]) acc[type] = [];
      if (!acc[type].some((cat) => cat.slug === slug)) {
        acc[type].push({
          id: categoryIdCounter++,
          slug,
          title: slug,
          type,
        });
      }
    };

    if (game.category) addCategory("category", game.category);
    if (game.subCategory) addCategory("subCategory", game.subCategory);
    if (game.extraCategories)
      addCategory("extraCategories", game.extraCategories);
    if (game.type) addCategory("type", game.type);

    return acc;
  }, {} as Record<"type" | "category" | "subCategory" | "tags" | "extraCategories", Category[]>);
};
