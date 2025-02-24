import { useWishlist } from "../contexts/WishlistProvider";
import List from "../components/List";
import { StyleSheet, View } from "react-native";

const WishlistScreen = () => {
  const { wishlist } = useWishlist();

  return (
    <View style={styles.container}>
      <List
        data={wishlist}
        handleNextPage={() => {}}
        isLoading={false}
        isPaginating={false}
        emptyMessage="Your wishlist is empty"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WishlistScreen;
