import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type HomeStackParamList = {
  Home: undefined;
  Artwork: { id: number };
};

type WishlistStackParamList = {
  Wishlist: undefined;
  Artwork: { id: number };
};
