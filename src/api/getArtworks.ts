import { fetcher } from "./fetcher";
import type { ArtworkData, GetArtworks } from "./types";

export const getArtworks = async ({
  page = 1,
  limit = 15,
}: GetArtworks): Promise<ArtworkData | undefined> => {
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
