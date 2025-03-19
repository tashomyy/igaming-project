import { toast } from "react-toastify";
import { apiClient } from "./apiClient";

export const fetchGames = async () => {
  try {
    const response = await apiClient.get(
      `https://cdn-cms.igp.cloud/bto/static/files/games/desktop.json`
    );
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
