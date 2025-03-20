import { toast } from "react-toastify";
import { apiClient } from "./apiClient";

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
