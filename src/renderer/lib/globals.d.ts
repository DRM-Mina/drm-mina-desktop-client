interface Game {
  gameId: number;
  name: string;
  description: string;
  creator: string;
  imageFolder: string;
  imageCount: number;
  price: number;
  discount: number;
  tags: string[];
}

interface GamePrices {
  data: {
    runtime: {
      GameToken: {
        gamePrice: {
          value: string | null;
        };
        discount: {
          value: string | null;
        };
      };
    };
  };
}

interface GameNumber {
  data: {
    runtime: {
      GameToken: {
        totalGameNumber: {
          value: string | null;
        };
      };
    };
  };
}

interface Library {
  data: {
    runtime: {
      GameToken: {
        users: boolean | null;
      };
    };
  };
}
