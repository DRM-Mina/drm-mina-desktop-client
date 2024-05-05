import { Input } from '@/components/ui/input';
import React from 'react';
import { useUserStore } from '../lib/stores/userWallet';

export default function Web3Wallet() {
  const [inputValue, setInputValue] = React.useState('');
  const userStore = useUserStore();
  return (
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
        }
      }}
    ></Input>
  );
}
