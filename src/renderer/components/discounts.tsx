import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
  CardFooter,
  CardShadow,
  CardTitle,
} from '@/components/ui/card';

// import GameBookmark from './bookmark';
import DiscountRate from './discountRate';
import { useNavigate } from 'react-router-dom';
import { useGamesStore } from '../lib/stores/gameStore';
import { API_URL } from '@/env';

export default function Discounts() {
  const gameStore = useGamesStore();

  const navigate = useNavigate();

  return (
    <div className="row-span-1 col-span-3 lg:col-span-5 flex justify-center">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full p-4 max-w-4xl justify-center"
      >
        <h3 className="mb-2 mt-2 text-lg font-medium tracking-tight">
          On Discount
        </h3>
        <CarouselContent>
          {Array.from(gameStore.discountGames).map((game, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3">
              <div className="p-2">
                <Card
                  className=" overflow-hidden cursor-pointer"
                  onClick={() => navigate('/game-detail/' + game.name)}
                >
                  <CardContent className="relative flex items-center justify-center p-6 lg:aspect-3/4 md:aspect-square">
                    <img
                      src={
                        API_URL +
                        'images/' +
                        game.imageFolder +
                        '/10/' +
                        game.imageFolder +
                        '.webp'
                      }
                      crossOrigin="anonymous"
                      alt={game.name}
                      className="w-full h-full object-cover"
                    />
                    <DiscountRate game={game} />
                    {/* <GameBookmark gameId={game.gameId} /> */}
                  </CardContent>
                  <CardFooter className="w-</CardContent>full flex justify-between">
                    <CardTitle className=" text-base">{game.name}</CardTitle>
                    <CardShadow className=" flex flex-col justify-center items-start px-3 rounded-sm">
                      <span className=" text-xs strikethrough text-gray-500">
                        &nbsp;{game?.price}&nbsp;
                      </span>
                      <div className="flex justify-center items-center gap-1">
                        <span className=" text-lg">
                          {game?.price - game?.discount}
                        </span>
                        <img
                          src={`${API_URL}/images/mina/20/mina.webp`}
                          alt="mina"
                          className=" w-4 h-4 inline-block"
                        />
                      </div>
                    </CardShadow>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
