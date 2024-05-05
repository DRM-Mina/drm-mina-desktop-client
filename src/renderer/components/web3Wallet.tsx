import { Input } from '@/components/ui/input';
import React from 'react';
import { useUserStore } from '../lib/stores/userWallet';
import { Button } from '@/components/ui/button';

export default function Web3Wallet() {
  const [inputValue, setInputValue] = React.useState('');
  const userStore = useUserStore();
  return userStore.userPublicKey ? (
    <div className="w-full">
      <span className="text-sm font-semibold text-gray-600">
        {userStore.userPublicKey.slice(0, 6)}...
        {userStore.userPublicKey.slice(-4)}
      </span>
      <Button
        className="text-sm font-semibold"
        variant={'ghost'}
        onClick={() => userStore.disconnect()}
      >
        Disconnect
      </Button>
    </div>
  ) : (
    <Input
      className=" w-full "
      type="text"
      value={inputValue}
      placeholder="Enter your public key"
      onChange={(event) => {
        setInputValue(event.target.value);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          userStore.setUserPublicKey(inputValue);
          userStore.setConnected(true);
        }
      }}
    ></Input>
  );
}
