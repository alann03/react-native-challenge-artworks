import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { Artwork } from "../typings/artwork";
import ArtworkCard from "./ArtworkCard";
import { useCallback } from "react";

interface Props {
  data: Artwork[];
  isLoading: boolean;
  isPaginating: boolean;
  handleNextPage: () => void;
  emptyMessage: string;
}

const List = ({ data, isLoading, isPaginating, handleNextPage, emptyMessage }: Props) => {
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

  const EmptyMessage = () => {
    return (
      <View style={styles.emptyMessageContainer}>
        <Text style={styles.emptyMessage}>{emptyMessage}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => String(item?.id)}
      ListEmptyComponent={EmptyMessage}
      ListFooterComponent={
        isPaginating ? <ActivityIndicator style={styles.listLoadingPage} size="small" /> : null
      }
      onEndReached={handleNextPage}
      onEndReachedThreshold={0.5}
      contentContainerStyle={[styles.container, { flex: data.length === 0 ? 1 : 0 }]}
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
  emptyMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default List;
