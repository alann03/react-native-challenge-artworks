export interface Artwork {
  id: number;
  title: string;
  color: Color;
  image_id: string;
}
interface Color {
  h: number;
  l: number;
  s: number;
  percentage: number;
  population: number;
}

export interface ArtworkDetails extends Artwork {
  medium_display: string;
  artist_title: string;
  date_display: string;
  description: string;
}
