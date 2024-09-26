import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ChevronLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useParams } from 'react-router-dom';
import { useGamesStore } from '../lib/stores/gameStore';
import { Separator } from '@/components/ui/separator';

const ENDPOINT = 'http://localhost:3333/';

export default function GameDetail() {
  const { gameName } = useParams();
  const navigate = useNavigate();
  const gameStore = useGamesStore();

  const game = gameStore.games.find((game) => game.name === gameName);
  const imageCount = game?.imageCount || 1;

  const handleDownload = () => {};

  return (
    <div>
      <div className=" grid grid-cols-5 w-full p-4">
        <div className=" col-span-3 h-full mt-8">
          <Button
            variant={'outline'}
            onClick={() => navigate('/store')}
            className=" ml-4"
          >
            <ChevronLeft size={24} /> Back to Store
          </Button>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full p-4 justify-center"
          >
            <CarouselContent>
              {Array.from({ length: imageCount }).map((_, i) => (
                <CarouselItem key={i}>
                  <img
                    src={
                      imageCount > 1
                        ? ENDPOINT! +
                          'images/' +
                          game?.imageFolder +
                          '/40/' +
                          game?.imageFolder +
                          '_ingame_' +
                          (i + 1) +
                          '.webp'
                        : ENDPOINT! + 'images/default/40/default.webp'
                    }
                    crossOrigin="anonymous"
                    alt="Game"
                    className="w-full h-full object-cover aspect-video"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className=" h-full col-span-2 px-4">
          <div className=" flex flex-col items-center h-full p-8 mt-8 justify-between">
            <h1 className=" text-3xl font-bold p-4">{game?.name}</h1>
            <div className=" text-base mt-8">{game?.description}</div>

            <div>Total Reviews: 5 (4.3)</div>

            <div>
              {Array.from(game?.tags || []).map((tag, index) => (
                <Badge key={index} className=" rounded-lg mx-1">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 ">
              <div className=" flex flex-row mt-8 p-2 gap-4 border border-gray-300 rounded-lg">
                <div className=" flex gap-1 justify-center items-center ">
                  {game?.discount || 0 > 0 ? (
                    <>
                      <div className=" text-lg text-discount bg-discount rounded-lg p-1">
                        -%
                        {Math.floor(
                          ((game?.discount || 0) / (game?.price || 1)) * 100,
                        )}
                      </div>
                      <span className="text-base strikethrough text-gray-500 px-2">
                        {game?.price}
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                  <span className="text-base">
                    {game?.price! - game?.discount!}
                  </span>
                  <img
                    src={'http://localhost:3333/images/mina/20/mina.webp'}
                    alt="mina"
                    className=" w-4 h-4 inline-block"
                  />
                </div>
                <Button
                  variant={'default'}
                  onClick={() => {
                    window.electron.ipcRenderer.sendMessage(
                      'redirect-buy-game',
                      [game?.name],
                    );
                  }}
                >
                  Buy Game
                </Button>
              </div>
              <Button variant={'link'} className="">
                <Download size={24} onClick={handleDownload} />
                Download Game
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-6">
        <div className=" col-span-2 p-8">
          <h3 className=" font-semibold">Contract Adresses</h3>
          <Separator />
          <div className=" mt-4 gap-2 flex flex-col text-sm">
            <div>
              <span className=" font-semibold">
                Game Token Contract Address:{' '}
              </span>
              <a
                href={`https://minascan.io/devnet/account/${game?.gameTokenContractAddress}`}
                target="_blank"
                rel="noreferrer"
                className=" text-sm font-normal underline underline-offset-4"
              >
                {game?.gameTokenContractAddress}
              </a>
            </div>
            <div>
              <span className=" font-semibold">DRM Contract Address: </span>
              <a
                href={`https://minascan.io/devnet/account/${game?.DRMContractAddress}`}
                target="_blank"
                rel="noreferrer"
                className=" text-sm font-normal underline underline-offset-4"
              >
                {game?.DRMContractAddress}
              </a>
            </div>
          </div>
        </div>
        <div className=" col-span-1"></div>
      </div>
      {/* <CommentSection /> */}
    </div>
  );
}
