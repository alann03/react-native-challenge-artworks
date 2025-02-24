import AsyncStorage from "@react-native-async-storage/async-storage";
import { Artwork } from "../typings/artwork";

const WISHLIST_KEY = "wishlist";

const saveWishlist = async (wishlist: Artwork[]) => {
  try {
    await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  } catch (error) {
    console.error("Error saving wishlist:", error);
  }
};

const getWishlist = async (): Promise<Artwork[]> => {
  try {
    const stored = await AsyncStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    return [];
  }
};

const addToWishlist = async (artwork: Artwork) => {
  try {
    const wishlist = await getWishlist();
    if (!wishlist.some((item) => item.id === artwork.id)) {
      const updatedWishlist = [...wishlist, artwork];
      await saveWishlist(updatedWishlist);
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
  }
};

const removeFromWishlist = async (artworkId: number) => {
  try {
    const wishlist = await getWishlist();
    const updatedWishlist = wishlist.filter((item) => item.id !== artworkId);
    await saveWishlist(updatedWishlist);
  } catch (error) {
    console.error("Error removing from wishlist:", error);
  }
};

export { getWishlist, addToWishlist, removeFromWishlist };
