interface Game {
  gameId: number;
  name: string;
  description: string;
  creator: string;
  imageFolder: string;
  imageCount: number;
  gameTokenContractAddress: string;
  DRMContractAddress: string;
  price: number;
  discount: number;
  tags: string[];
  downloadable: boolean;
  averageRating: number;
  ratingCount: number;
}
interface RawIdentifiers {
  cpuId: string;
  systemSerial: string;
  systemUUID: string;
  baseboardSerial: string;
  macAddress: string[];
  diskSerial: string;
}
interface IComment {
  _id: string;
  user: {
    publicKey: string;
    _id: string;
  };
  gameId: number;
  content: string;
  rating: number;
  createdAt: string;
}
