import { Keyboard, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Artwork } from "../typings/artwork";
import { getArtworks, Pagination } from "../api/getArtworks";
import List from "../components/List";
import { searchArtworks } from "../api/searchArtworks";
import Searchbar from "../components/Searchbar";

const HomeScreen = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const fetchData = async (
    pageNumber: number,
    isPaginatingRequest = false,
    isSearchRequest = false,
  ) => {
    if (isPaginatingRequest) {
      setIsPaginating(true);
    } else {
      setIsLoading(true);
    }

    try {
      let response;

      if (isSearchRequest && searchTerm.trim()) {
        response = await searchArtworks({
          term: searchTerm.trim(),
          page: pageNumber,
        });
      } else {
        response = await getArtworks({ page: pageNumber });
      }

      if (Array.isArray(response?.data)) {
        if (pageNumber === 1) {
          setArtworks(response.data);
        } else {
          setArtworks((prev) => [...prev, ...response.data]);
        }
        setPagination(response?.pagination || null);
      }
    } catch (error) {
      console.error(
        isSearchRequest ? "Error searching artworks:" : "Error fetching artworks:",
        error,
      );
    } finally {
      setIsLoading(false);
      setIsPaginating(false);
    }
  };

  useEffect(() => {
    fetchData(1, false, false);
  }, []);

  const handleSearch = async () => {
    Keyboard.dismiss();
    if (!searchTerm.trim()) return;

    setIsSearchActive(true);
    fetchData(1, false, true);
  };

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    Keyboard.dismiss();
    if (isSearchActive) {
      setIsSearchActive(false);
      fetchData(1, false, false);
    }
  };

  const handleNextPage = () => {
    if (!isPaginating && pagination && pagination?.current_page < pagination?.total_pages) {
      const nextPage = pagination.current_page + 1;
      fetchData(nextPage, true, isSearchActive);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        value={searchTerm}
        onChangeText={handleSearchChange}
        onClear={handleClearSearch}
        onSearch={handleSearch}
        placeholder="Search..."
        isLoading={isLoading}
      />
      <List
        data={artworks}
        isLoading={isLoading}
        isPaginating={isPaginating}
        handleNextPage={handleNextPage}
        emptyMessage={
          isSearchActive
            ? "No results were found for this search"
            : "There are no artworks available"
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 4,
  },
});

export default HomeScreen;
