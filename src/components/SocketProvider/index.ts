import {useMemo} from 'react';
import constate from 'constate';
import {useSocketHandler} from '@/components/SocketProvider/hooks/useSocketHandler';
import {usePeerHandler} from '@/components/SocketProvider/hooks/usePeerHandler';

const _provider = () => {
  /* -- socket handler -- */
  const {socketListener, messages} = useSocketHandler();

  /* -- peer handler -- */
  const {peerStream} = usePeerHandler();

  return useMemo(
    () => ({
      socketListener,
      peerStream,
      messages,
    }),
    [socketListener, messages, peerStream],
  );
};

export const [SocketProvider, useSocket] = constate(_provider, val => val);
