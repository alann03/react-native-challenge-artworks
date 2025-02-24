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
  page: number;
  limit?: number;
}

export const getArtworks = async ({
  page = 1,
  limit = 15,
}: Props): Promise<ArtworkData | undefined> => {
  try {
    const response = await fetcher(
      `/artworks?page=${page}&limit=${limit}&fields=id,title,image_id,color`,
      {
        method: "GET",
      },
    );

    return {
      data: response?.data,
      pagination: response?.pagination,
    };
  } catch (error) {
    console.error("Error fetching artworks:", error);
    throw error;
  }
};
