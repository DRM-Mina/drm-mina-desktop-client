import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';
import { useUserStore } from '../lib/stores/userWallet';
import { toggleGameWishlist } from '../lib/api';

export default function GameBookmark({
  className,
  gameId,
}: {
  className?: string;
  gameId: number;
}) {
  const userStore = useUserStore();
  return (
    <Bookmark
      className={cn(
        `absolute right-2 top-2 h-6 w-6 cursor-pointer ${
          userStore.wishlist.includes(gameId) ? ' fill-current' : 'fill-card'
        }`,
        className,
      )}
      onClick={async (e) => {
        e.stopPropagation();
        if (userStore.isConnected) {
          const status = await toggleGameWishlist(
            // @ts-ignore
            userStore.userPublicKey,
            gameId,
          );
          if (!status) {
            userStore.removeWishlist(gameId);
          } else {
            userStore.addWishlist(gameId);
          }
        } else {
        }
      }}
    ></Bookmark>
  );
}
