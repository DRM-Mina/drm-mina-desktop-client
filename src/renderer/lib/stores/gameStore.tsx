import { create } from 'zustand';
interface Game {
  gameId: number;
  name: string;
  description: string;
  creator: string;
  cover: string;
  price: number;
  discount: number;
  rating: number;
  releaseDate: string;
  tags: string[];
}
interface GameStoreState {
  games: Game[];
  discountGames: Game[];
  setGames: (gameList: Game[]) => void;
  setDiscountGames: (gameList: Game[]) => void;
}

export const useGamesStore = create<GameStoreState>()((set) => ({
  games: [],
  discountGames: [],
  setGames: (gameList) => set({ games: gameList }),
  setDiscountGames: (gameList) => set({ discountGames: gameList }),
}));
