import { useGamesStore } from '../lib/stores/gameStore';
import { useUserStore } from '../lib/stores/userWallet';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

const ENDPOINT = 'https://drmmina_api.kadircan.org/';

export default function Library() {
  const userStore = useUserStore();
  const gameStore = useGamesStore();

  const handleGameDownload = () => {};
  return (
    <div className=" p-8">
      {userStore.isConnected ? (
        userStore.library.length === 0 ? (
          <div className=" flex w-full justify-center ">
            <h2 className="mb-2 text-lg font-medium tracking-tight">
              Your Library Is Empty
            </h2>

            <h3
              className="absolute top-1/2 mb-2 cursor-pointer align-middle text-lg font-medium tracking-tight underline underline-offset-2 hover:underline-offset-4"
              onClick={() => {}}
            >
              Explore the store
            </h3>
          </div>
        ) : (
          <div className=" flex w-full flex-col items-center justify-center gap-6">
            <h3 className="mb-2 text-lg font-medium tracking-tight">
              Owned Games
            </h3>
            {gameStore.games
              .filter((game: Game) => userStore.library.includes(game.gameId))
              .map((game, index) => {
                return (
                  <Card
                    key={index}
                    className=" card-hover-effect grid w-2/3 cursor-pointer grid-cols-8"
                    onClick={() => {}}
                  >
                    <CardContent className=" col-span-3 aspect-video items-center justify-center  p-4">
                      <img
                        src={ENDPOINT + game.cover}
                        crossOrigin="anonymous"
                        alt={game.name}
                        className="flex h-full w-full rounded-lg object-cover"
                      />
                    </CardContent>

                    <CardContent className=" col-span-3 items-center">
                      <CardTitle className=" pb-2 pt-6">{game.name}</CardTitle>
                      <CardDescription className="py-2">
                        {game.description}
                      </CardDescription>
                    </CardContent>
                    <CardContent className=" col-span-2 flex items-center justify-center">
                      <Button
                        className=" "
                        variant={'link'}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleGameDownload();
                        }}
                      >
                        <Download size={24} />
                        Download Game
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        )
      ) : (
        <div className="flex h-[80vh] items-center justify-center">
          <h3 className="text-3xl font-medium">
            Please enter your wallet to view your library
          </h3>
        </div>
      )}
    </div>
  );
}
