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
import { fetchGameData, fetchWishlist } from './lib/api';
import { useGamesStore } from './lib/stores/gameStore';
import { useUserStore } from './lib/stores/userWallet';
import Browse from './pages/browse';

const priceQuery = `
query GetPrices {
  runtime {
    GameToken {
      gamePrice(key: {value: "$gameId"}) {
        value
      }
      discount(key: {value: "$gameId"}) {
        value
      }
    }
  }
}
`;

const gameNumberQuery = `
query TotalGameNumber {
  runtime {
    GameToken {
      totalGameNumber {
        value
      }
    }
  }
}
`;

const libraryQuery = `
query getLibrary {
  runtime {
    GameToken {
      users(key: {address: "$address", gameId: {value: "$gameId"}})
    }
  }
}
`;

export default function App() {
  const gameStore = useGamesStore();

  const userStore = useUserStore();

  useEffect(() => {
    if (userStore.isConnected) {
      (async () => {
        const wishlist = await fetchWishlist(userStore.userPublicKey!);

        userStore.setWishlist(wishlist);

        const gameNumberResponse = await fetch(
          'https://drmmina_chain.kadircan.org/graphql',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: gameNumberQuery,
            }),
          },
        );

        const { data } = (await gameNumberResponse.json()) as GameNumber;

        const gameIds = Array.from(
          { length: Number(data.runtime.GameToken.totalGameNumber.value) },
          (_, i) => i + 1,
        );
        let library: number[] = [];
        for (const gameId of gameIds) {
          const response = await fetch(
            'https://drmmina_chain.kadircan.org/graphql',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: libraryQuery
                  .replace(/\$address/g, userStore.userPublicKey!)
                  .replace(/\$gameId/g, gameId.toString()),
              }),
            },
          );

          const { data } = (await response.json()) as Library;

          if (data.runtime.GameToken.users) {
            library.push(gameId);
          }
        }
        userStore.setLibrary(library);
      })();
    }
  }, [userStore.isConnected, userStore.userPublicKey]);

  useEffect(() => {
    (async () => {
      const games: Game[] = await fetchGameData();
      let gameList: Game[] = [];

      const gameNumberResponse = await fetch(
        'https://drmmina_chain.kadircan.org/graphql',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: gameNumberQuery,
          }),
        },
      );

      const { data } = (await gameNumberResponse.json()) as GameNumber;

      const gameIds = Array.from(
        { length: Number(data.runtime.GameToken.totalGameNumber.value) },
        (_, i) => i + 1,
      );
      for (const gameId of gameIds) {
        const response = await fetch(
          'https://drmmina_chain.kadircan.org/graphql',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: priceQuery.replace(/\$gameId/g, gameId.toString()),
            }),
          },
        );

        const { data } = (await response.json()) as GamePrices;

        if (
          data.runtime.GameToken.discount?.value &&
          data.runtime.GameToken.gamePrice?.value
        ) {
          const game = games.find((game: Game) => game.gameId === gameId);
          if (game) {
            game.price = Number(
              data.runtime.GameToken.gamePrice?.value.toString(),
            );
            game.discount = Number(
              data.runtime.GameToken.discount?.value.toString(),
            );
            if (!game.imageFolder) {
              game.imageFolder = 'default';
            }
            gameList.push(game);
          }
        }
      }
      gameStore.setGames(gameList);
      const discounts = gameList.filter((game: Game) => game.discount > 0);
      gameStore.setDiscountGames(discounts);
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
