import { Artwork } from "../typings/artwork";
import { fetcher } from "./fetcher";

export const getArtworkDetails = async (id: number): Promise<Artwork | undefined> => {
  try {
    const response = await fetcher(`/artworks/${id}`, {
      method: "GET",
    });

    return response?.data;
  } catch (error) {
    console.error("Error fetching artwork details:", error);
    throw error;
  }
};
