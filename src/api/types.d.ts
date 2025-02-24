import { Artwork } from "../typings/artwork";

export interface ArtworkData {
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

export interface GetArtworks {
  page: number;
  limit?: number;
}

export interface SearchArtworks extends GetArtworks {
  term: string;
}
