import { ArtworkDetails } from "../typings/artwork";
import { fetcher } from "./fetcher";

export const getArtworkDetails = async (id: number): Promise<ArtworkDetails | undefined> => {
  try {
    const response = await fetcher(
      `/artworks/${id}?fields=id,title,image_id,color,medium_display,artist_title,date_display,description`,
      {
        method: "GET",
      },
    );

    return response?.data;
  } catch (error) {
    console.error("Error fetching artwork details:", error);
    throw error;
  }
};
