import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { useWishlist } from "../contexts/WishlistProvider";
import { Artwork } from "../typings/artwork";
import { Ionicons } from "@expo/vector-icons";

type WishlistButtonProps = {
  artwork: Artwork;
  style?: StyleProp<ViewStyle>;
};

const WishlistButton = ({ artwork, style }: WishlistButtonProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const { id } = artwork;

  const handlePress = () => {
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(artwork);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, style]}>
      {isInWishlist(id) ? (
        <Ionicons name="heart" size={30} color="red" />
      ) : (
        <Ionicons name="heart" size={30} color="grey" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 20,
    padding: 4,
    zIndex: 999,
  },
});

export default WishlistButton;
