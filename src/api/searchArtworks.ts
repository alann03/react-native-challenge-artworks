import { Artwork } from "../typings/artwork";
import { fetcher } from "./fetcher";

interface ArtworkData {
  pagination: Pagination;
  data: Artwork[];
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
}

interface Props {
  term: string;
  page: number;
  limit?: number;
}

export const searchArtworks = async ({
  term,
  page = 1,
  limit = 12,
}: Props): Promise<ArtworkData | undefined> => {
  try {
    const response = await fetcher(
      `/artworks/search?q=${term}&page=${page}&limit=${limit}&fields=id,title,image_id,color`,
      {
        method: "GET",
      },
    );

    return {
      data: response?.data,
      pagination: response?.pagination,
    };
  } catch (error) {
    console.error("Error fetching artworks search:", error);
    throw error;
  }
};
