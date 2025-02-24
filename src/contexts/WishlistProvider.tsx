import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import {
  getWishlist,
  addToWishlist as storageAddToWishlist,
  removeFromWishlist as storageRemoveFromWishlist,
  clearWishlist as storageClearWishlist,
} from "../storage/wishlistStorage";
import { Artwork } from "../typings/artwork";

type WishlistContextType = {
  wishlist: Artwork[];
  addToWishlist: (artwork: Artwork) => Promise<void>;
  removeFromWishlist: (artworkId: number) => Promise<void>;
  clearWishlist: () => Promise<void>;
  isInWishlist: (artworkId: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<Artwork[]>([]);

  useEffect(() => {
    const loadWishlist = async () => {
      const storedWishlist = await getWishlist();
      setWishlist(storedWishlist);
    };

    loadWishlist();
  }, []);

  const handleAddToWishlist = useCallback(async (artwork: Artwork) => {
    await storageAddToWishlist(artwork);
    setWishlist(await getWishlist());
  }, []);

  const handleRemoveFromWishlist = useCallback(async (artworkId: number) => {
    await storageRemoveFromWishlist(artworkId);
    setWishlist(await getWishlist());
  }, []);

  const handleClearWishlist = useCallback(async () => {
    await storageClearWishlist();
    setWishlist([]);
  }, []);

  const isInWishlist = (artworkId: number) => wishlist.some((item) => item.id === artworkId);

  const value = useMemo(
    () => ({
      wishlist,
      addToWishlist: handleAddToWishlist,
      removeFromWishlist: handleRemoveFromWishlist,
      clearWishlist: handleClearWishlist,
      isInWishlist,
    }),
    [wishlist, handleAddToWishlist, handleRemoveFromWishlist, handleClearWishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside a WishlistProvider");
  }
  return context;
};
