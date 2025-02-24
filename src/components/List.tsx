import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Artwork } from "../typings/artwork";
import ArtworkCard from "./ArtworkCard";
import { useCallback } from "react";

interface Props {
  data: Artwork[];
  isLoading: boolean;
  isPaginating: boolean;
  handleNextPage: () => void;
}

const List = ({ data, isLoading, isPaginating, handleNextPage }: Props) => {
  const renderItem = useCallback(
    ({ item }: { item: Artwork }) => <ArtworkCard artworkData={item} key={item.id} />,
    [],
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => String(item?.id)}
      ListFooterComponent={
        isPaginating ? <ActivityIndicator style={styles.listLoadingPage} size="small" /> : null
      }
      onEndReached={handleNextPage}
      onEndReachedThreshold={0.5}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
  },
  listLoadingPage: {
    marginVertical: 16,
  },
});

export default List;
