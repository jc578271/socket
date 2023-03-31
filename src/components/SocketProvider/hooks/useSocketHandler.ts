import {ESocketEvent} from '../events';
import {emitEvent} from '../utils';
import {runOnUI, useSharedValue} from 'react-native-reanimated';
import {useEffect, useMemo} from 'react';
import {io} from 'socket.io-client';
import {IP_ADDRESS, PORT} from '../constants';

export const socket = io(`http://${IP_ADDRESS}:${PORT}`);

export type ISocketListener = {
  [key in ESocketEvent]?: {
    user: string;
    params: any;
  };
};

export const useSocketHandler = () => {
  const socketListener = useSharedValue<ISocketListener>({});
  const messages = useSharedValue<{user: string; msg: string}[]>([]);

  useEffect(() => {
    socket.on(ESocketEvent.CHAT_MESSAGE, msg => {
      emitEvent(socketListener, ESocketEvent.CHAT_MESSAGE, msg);
    });

    socket.on(ESocketEvent.TYPING, msg => {
      emitEvent(socketListener, ESocketEvent.TYPING, msg);
    });

    socket.on(ESocketEvent.SEND_MESSAGE, msg => {
      emitEvent(socketListener, ESocketEvent.SEND_MESSAGE, msg);
      runOnUI(() => {
        'worklet';
        messages.value = [
          ...messages.value,
          {user: msg?.user, msg: msg?.params},
        ];
      })();
      // syncMessage()
    });

    socket.on(ESocketEvent.CONNECT_PEER, msg => {
      console.log(msg);
    });
  }, []);

  return useMemo(
    () => ({
      socketListener,
      messages,
    }),
    [socketListener, messages],
  );
};
