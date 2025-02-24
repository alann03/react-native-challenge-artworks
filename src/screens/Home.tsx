import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Artwork } from "../typings/artwork";
import { getArtworks, Pagination } from "../api/getArtworks";
import List from "../components/List";

const HomeScreen = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const fetchArtworks = async (pageNumber: number, isPaginatingRequest = false) => {
    if (isPaginatingRequest) {
      setIsPaginating(true);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await getArtworks({ page: pageNumber });

      if (Array.isArray(response?.data) && response.data.length > 0) {
        setArtworks((prev) => (pageNumber === 1 ? response.data : [...prev, ...response.data]));
        setPagination(response?.pagination);
      }
    } catch (error) {
      console.error("Error fetching artworks:", error);
    } finally {
      setIsLoading(false);
      setIsPaginating(false);
    }
  };

  useEffect(() => {
    fetchArtworks(1);
  }, []);

  const handleNextPage = () => {
    if (!isPaginating && pagination?.next_url) {
      fetchArtworks(pagination?.current_page + 1, true);
    }
  };

  return (
    <View style={styles.container}>
      <List
        data={artworks ?? []}
        isLoading={isLoading}
        isPaginating={isPaginating}
        handleNextPage={handleNextPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
