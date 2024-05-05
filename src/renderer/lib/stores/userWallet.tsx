import { create } from 'zustand';

interface UserState {
  isConnected: boolean;
  userPublicKey?: string;
  userMinaBalance: number;
  wishlist: number[];
  library: number[];

  setConnected: (connected: boolean) => void;
  setUserPublicKey: (publicKey: string) => void;
  setUserMinaBalance: (balance: number) => void;
  setWishlist: (wishlist: number[]) => void;
  addWishlist: (gameId: number) => void;
  removeWishlist: (gameId: number) => void;
  setLibrary: (library: number[]) => void;
  disconnect: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  isConnected: false,
  userPublicKey: '',
  userMinaBalance: 0,
  wishlist: [],
  library: [],

  setConnected: (connected) => set({ isConnected: connected }),
  setUserPublicKey: (publicKey) => set({ userPublicKey: publicKey }),
  setUserMinaBalance: (balance) => set({ userMinaBalance: balance }),
  addWishlist: (gameId) =>
    set((state) => ({ wishlist: [...state.wishlist, gameId] })),
  removeWishlist: (gameId) =>
    set((state) => ({
      wishlist: state.wishlist.filter((id) => id !== gameId),
    })),
  setWishlist: (wishlist) => set({ wishlist }),
  setLibrary: (library) => set({ library }),
  disconnect: () =>
    set({
      isConnected: false,
      userPublicKey: '',
      userMinaBalance: 0,
      wishlist: [],
      library: [],
    }),
}));
