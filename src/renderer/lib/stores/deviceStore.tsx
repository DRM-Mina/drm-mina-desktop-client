import { create } from 'zustand';

interface RawIdentifiers {
  cpuId: string;
  systemSerial: string;
  systemUUID: string;
  baseboardSerial: string;
  macAddress: string[];
  diskSerial: string;
}

interface DeviceStoreState {
  isDeviceSet: boolean;
  device: RawIdentifiers | {};
  setDevice: (device: RawIdentifiers) => void;
}

export const useDeviceStore = create<DeviceStoreState>()((set) => ({
  isDeviceSet: false,
  device: {},

  setDevice: (device) => set({ isDeviceSet: true, device: device }),
}));
