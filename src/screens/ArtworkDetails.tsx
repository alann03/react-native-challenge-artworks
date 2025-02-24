import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import type { ArtworkDetails } from "../typings/artwork";
import { getArtworkDetails } from "../api/getArtworkDetails";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../navigation/navigation";
import { LinearGradient } from "expo-linear-gradient";
import WishlistButton from "../components/WishlistButton";

type ArtworkRouteProps = RouteProp<HomeStackParamList, "Artwork">;

interface ArtworkDetailsScreenProps {
  route: ArtworkRouteProps;
}

const ArtworkDetailsScreen: React.FC<ArtworkDetailsScreenProps> = ({ route }) => {
  const [artwork, setArtwork] = useState<ArtworkDetails>();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = route.params;

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      const response = await getArtworkDetails(id);

      setArtwork(response);
      setIsLoading(false);
    };

    fetchArtworkDetails();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const hslColor = `hsl(${artwork?.color?.h ?? 255}, ${artwork?.color?.s ?? 255}%, ${
    artwork?.color?.l ?? 255
  }%)`;

  return (
    <LinearGradient style={styles.gradient} colors={[hslColor, "#000000"]} locations={[0.2, 1]}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://www.artic.edu/iiif/2/${artwork?.image_id}/full/843,/0/default.jpg`,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.detailsContainer}>
          {artwork && <WishlistButton artwork={artwork} style={styles.wishlistButton} />}
          <Text style={styles.title}>{artwork?.title}</Text>
          {artwork?.medium_display && <Text style={styles.medium}>{artwork?.medium_display}</Text>}
          <View style={styles.artistAndDate}>
            <Text numberOfLines={1} style={styles.artist}>
              {artwork?.artist_title ?? "Unknown"}
            </Text>
            <Text numberOfLines={1} style={styles.date}>
              {artwork?.date_display ?? "Unknown"}
            </Text>
          </View>
          <Text style={styles.description}>
            {artwork?.description || "No description available."}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: 400,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  detailsContainer: {
    backgroundColor: "#1b1b1b",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 30,
    marginHorizontal: 16,
    minHeight: "100%",
    top: -40,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  medium: {
    fontSize: 16,
    color: "#ffffff9e",
    fontWeight: "300",
    fontStyle: "italic",
  },
  artistAndDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 8,
  },
  artist: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    backgroundColor: "#3c3c3c",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexShrink: 1,
    maxWidth: "70%",
  },
  date: {
    color: "#fff",
    fontSize: 17,
    flexShrink: 1,
    maxWidth: "50%",
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
  },
  wishlistButton: {
    position: "absolute",
    top: -8,
    right: -4,
  },
});

export default ArtworkDetailsScreen;
