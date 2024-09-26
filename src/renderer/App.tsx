import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import Home from './pages/home';
import { Sidebar } from './components/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import Searchbar from './components/searchbar';
import GameDetail from './components/game-detail';
import Categories from './pages/categories';
import Library from './pages/library';
import Wishlist from './pages/wishlist';
import { useEffect } from 'react';
import { fetchGameData } from './lib/api';
import { useGamesStore } from './lib/stores/gameStore';
import Browse from './pages/browse';

export default function App() {
  const gameStore = useGamesStore();

  useEffect(() => {
    (async () => {
      const games: Game[] = await fetchGameData();
      let discountGames: Game[] = [];
      games.forEach((game) => {
        if (!game.imageFolder) {
          game.imageFolder = 'default';
        }
        if (game.discount > 0) {
          discountGames.push(game);
        }
      });
      gameStore.setGames(games);
      gameStore.setDiscountGames(discountGames);
    })();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme-mode">
      <div className="border-t absolute inset-0">
        <div className="bg-background absolute inset-0">
          <div className="grid grid-cols-5">
            <Router>
              <Sidebar className="col-span-1 sticky top-0" />
              <div className=" overflow-hidden col-start-2 col-end-7">
                <Searchbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/store" element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/browse/:search" element={<Browse />} />
                  <Route
                    path="/game-detail/:gameName"
                    element={<GameDetail />}
                  ></Route>
                </Routes>
              </div>
            </Router>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

declare global {
  interface Window {
    api?: any;
  }
}
