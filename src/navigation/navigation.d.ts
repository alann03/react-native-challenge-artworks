import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type HomeStackParamList = {
  Home: undefined;
  Artwork: { id: number };
};

type RootTabParamList = {
  Home: undefined;
  Wishlist: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, "Home">;
export type WishlistScreenProps = BottomTabScreenProps<RootTabParamList, "Wishlist">;
