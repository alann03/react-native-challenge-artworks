import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import WishlistScreen from "../screens/Wishlist";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArtworkDetailsScreen from "../screens/ArtworkDetails";
import { HomeStackParamList, WishlistStackParamList } from "./navigation";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const WishlistStack = createNativeStackNavigator<WishlistStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="Artwork"
        component={ArtworkDetailsScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const WishlistStackNavigator = () => {
  return (
    <WishlistStack.Navigator>
      <WishlistStack.Screen name="Wishlist" component={WishlistScreen} />
      <WishlistStack.Screen
        name="Artwork"
        component={ArtworkDetailsScreen}
        options={{ headerShown: false }}
      />
    </WishlistStack.Navigator>
  );
};

export const RootTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="WishlistStack"
        component={WishlistStackNavigator}
        options={{
          headerShown: false,
          title: "Wishlist",
        }}
      />
    </Tab.Navigator>
  );
};
