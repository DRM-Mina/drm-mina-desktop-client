import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ModeToggle } from '@/components/mode-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Wallet,
  Bookmark,
  Store,
  Gamepad2,
  Search,
  Shapes,
  Bell,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Web3Wallet from './web3Wallet';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    navigate(path);
  };

  return (
    <div
      className={cn(
        'flex flex-col justify-between h-screen border-r',
        className,
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Gamepad2 className="h-6 w-6" />
              <span className="">DRM Mina</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto h-8 w-8"
                >
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>News</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <div className="p-1 text-sm text-center">
                  Everything up to date{' '}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-1 my-2">
            <Button
              variant={
                currentPath == '/store' || currentPath == '/'
                  ? 'secondary'
                  : 'ghost'
              }
              className="w-full justify-start"
              onClick={() => handleNavigate('/store')}
            >
              <Store className="mr-2 h-4 w-4" />
              Store
            </Button>
            <Button
              variant={currentPath == '/categories' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleNavigate('/categories')}
            >
              <Shapes className="mr-2 h-4 w-4" />
              Categories
            </Button>
          </div>
        </div>
      </div>
      <div className="px-6 flex w-full justify-between self-end absolute bottom-4">
        <ModeToggle />{' '}
        <Badge
          className=" rounded-lg text-center items-center"
          variant="outline"
        >
          v1.0
        </Badge>
      </div>
    </div>
  );
}
