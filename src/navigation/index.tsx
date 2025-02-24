import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import WishlistScreen from "../screens/Wishlist";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArtworkDetailsScreen from "../screens/ArtworkDetails";
import { HomeStackParamList, WishlistStackParamList } from "./navigation";
import { Ionicons } from "@expo/vector-icons";

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
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: "#f0f0f0",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: "#010407",
        tabBarInactiveTintColor: "#8E8E93",
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home" size={focused ? 26 : 24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WishlistStack"
        component={WishlistStackNavigator}
        options={{
          headerShown: false,
          title: "Wishlist",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="heart" size={focused ? 26 : 24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
