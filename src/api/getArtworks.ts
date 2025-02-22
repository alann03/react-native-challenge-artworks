import { Artwork } from "../typings/artwork";
import { fetcher } from "./fetcher";

interface ArtworkData {
  pagination: Pagination;
  data: Artwork[];
}

interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
}

export const getArtworks = async (): Promise<ArtworkData | undefined> => {
  try {
    const response = await fetcher("/artworks", {
      method: "GET",
    });

    return {
      data: response?.data,
      pagination: response?.pagination,
    };
  } catch (error) {
    console.error("Error fetching artworks:", error);
  }
};
