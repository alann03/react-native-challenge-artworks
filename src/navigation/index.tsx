import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import WishlistScreen from "../screens/Wishlist";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArtworkDetailsScreen from "../screens/ArtworkDetails";
import { HomeStackParamList } from "./navigation";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Artwork" component={ArtworkDetailsScreen} />
    </Stack.Navigator>
  );
};

export const RootTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
    </Tab.Navigator>
  );
};
