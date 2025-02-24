import { NavigationContainer } from "@react-navigation/native";
import { RootTabs } from "./navigation";
import { WishlistProvider } from "./contexts/WishlistProvider";

export default function App() {
  return (
    <WishlistProvider>
      <NavigationContainer>
        <RootTabs />
      </NavigationContainer>
    </WishlistProvider>
  );
}
