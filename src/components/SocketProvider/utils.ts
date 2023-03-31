import {runOnUI, SharedValue} from 'react-native-reanimated';
import {ESocketEvent} from '@/components/SocketProvider/events';
import {DeviceInfo} from '@true/services/DeviceInfo';
import {ISocketListener, socket} from './hooks/useSocketHandler';

const device = DeviceInfo.id;

export const emitEvent = (
  listener: SharedValue<ISocketListener>,
  key: ESocketEvent | string,
  params: any,
) => {
  runOnUI(() => {
    'worklet';
    const _key = key;
    const _params = params;
    listener.value = {...listener.value, [_key]: _params};
  })();
};

export const socketEmit = (msg: ESocketEvent, params: any) => {
  return socket.emit(msg, {
    user: device,
    params,
  });
};
