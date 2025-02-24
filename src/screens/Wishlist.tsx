import { useWishlist } from "../contexts/WishlistProvider";
import List from "../components/List";
import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const WishlistScreen = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);

  const handleClearWishlist = async () => {
    setIsLoading(true);
    await clearWishlist();
    setIsLoading(false);
  };

  const confirmClearWishlist = () => {
    Alert.alert(
      "Remove All",
      "Are you sure you want to clear your wishlist?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Clear",
          onPress: handleClearWishlist,
        },
      ],
      { cancelable: false },
    );
  };

  const disabled = wishlist?.length === 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={confirmClearWishlist}
        disabled={disabled}
        style={[styles.clearButtonContainer, disabled && styles.disabledButton]}
      >
        <Ionicons name="trash" size={30} color={"#fff"} />
      </TouchableOpacity>
      <List
        data={wishlist}
        handleNextPage={() => {}}
        isLoading={isLoading}
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
  clearButtonContainer: {
    position: "absolute",
    borderRadius: 20,
    padding: 5,
    zIndex: 999,
    bottom: 10,
    left: 10,
    backgroundColor: "#ff3e30",
  },
  disabledButton: {
    opacity: 0.4,
  },
});

export default WishlistScreen;
