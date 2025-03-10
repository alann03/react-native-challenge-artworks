import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HomeStackParamList } from "../navigation/navigation";
import WishlistButton from "./WishlistButton";
import { Artwork } from "../typings/artwork";

interface Props {
  artworkData: Artwork;
}

const ArtworkCard = ({ artworkData }: Props) => {
  const { navigate } = useNavigation<NavigationProp<HomeStackParamList>>();

  const { title, image_id, color, id } = artworkData;

  const handleNavigate = () => {
    navigate("Artwork", { id: id });
  };

  const hslColor = `hsla(${color?.h ?? 0}, ${color?.s ?? 0}%, ${color?.l ?? 0}%, 0.85)`;

  return (
    <TouchableOpacity onPress={handleNavigate} activeOpacity={0.7} style={styles.card}>
      <WishlistButton artwork={artworkData} style={styles.wishlistButton} />
      <View style={styles.cardContent}>
        <Image
          source={{ uri: `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg` }}
          style={styles.image}
        />
        <View style={[styles.overlay, { backgroundColor: hslColor }]}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cardContent: {
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    height: 150,
    width: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  wishlistButton: {
    position: "absolute",
    top: -4,
    right: -4,
  },
});

export default ArtworkCard;
