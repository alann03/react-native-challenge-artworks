import { fetcher } from "./fetcher";
import type { ArtworkData, SearchArtworks } from "./types";

export const searchArtworks = async ({
  term,
  page = 1,
  limit = 12,
}: SearchArtworks): Promise<ArtworkData | undefined> => {
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
