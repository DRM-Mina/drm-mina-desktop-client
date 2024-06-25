import { exec } from 'child_process';
import { RawIdentifiers } from './identifiers';

let system_info: RawIdentifiers = {
  cpuId: '',
  systemSerial: '',
  systemUUID: '',
  baseboardSerial: '',
  macAddress: [],
  diskSerial: '',
};

export function getMacOSSystemInfo(): Promise<RawIdentifiers> {
  const options = {
    encoding: 'utf-8',
    name: 'Electron',
    icns: '/assets/icon.svg',
  };
  const command =
    'system_profiler SPHardwareDataType | grep "Model Number" && system_profiler SPHardwareDataType | grep "Serial Number (system)" && system_profiler SPHardwareDataType | grep "Hardware UUID" && system_profiler SPHardwareDataType | grep "Serial Number (system)" && ifconfig en0 | grep ether && ifconfig en1 | grep ether';

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);

      if (stdout) {
        const lines = stdout.trim().split('\n');
        const cpu_id = '0000000000000000';
        const system_serial = lines[1].split(': ')[1].trim();
        const system_uuid = lines[2].split(': ')[1].trim();
        const baseboard_serial = lines[3].split(': ')[1].trim();
        const mac_addresses = lines.slice(4).map((line) => line.split(' ')[1]);

        system_info = {
          cpuId: cpu_id,
          systemSerial: system_serial,
          systemUUID: system_uuid,
          baseboardSerial: baseboard_serial,
          macAddress: mac_addresses,
          diskSerial: '',
        };
      }
      resolve(system_info);
    });
  });
}
