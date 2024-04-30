import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import Home from './pages/home';
import { Sidebar } from './components/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import Searchbar from './components/searchbar';
import GameDetail from './components/game-detail';

export default function App() {
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
                  <Route path="/browse" element={<div>browse</div>} />
                  <Route path="/categories" element={<div>categories</div>} />
                  <Route path="/library" element={<div>library</div>} />
                  <Route path="/wishlist" element={<div>wishlist</div>} />
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
