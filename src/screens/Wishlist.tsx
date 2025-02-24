import { useWishlist } from "../contexts/WishlistProvider";
import List from "../components/List";

const WishlistScreen = () => {
  const { wishlist } = useWishlist();

  return <List data={wishlist} handleNextPage={() => {}} isLoading={false} isPaginating={false} />;
};

export default WishlistScreen;
