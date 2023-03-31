import {MediaConnection, Peer} from 'react-native-peerjs';
import {deviceId, IP_ADDRESS, PORT} from '../constants';
import {useEffect, useMemo} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {ISocketListener} from '@/components/SocketProvider/hooks/useSocketHandler';
import { emitEvent } from "@/components/SocketProvider/utils";

export const peer = new Peer(deviceId, {
  host: IP_ADDRESS,
  secure: false,
  port: PORT,
  path: '/mypeer',
});

export let call: MediaConnection|null = null

export const usePeerHandler = () => {
  const peerStream = useSharedValue<MediaStream|null>(null)
  // const peerListener = useSharedValue<ISocketListener>({});

  useEffect(() => {
    peer.on('error', e => console.log('peer error: ' + e));

    peer.on('open', id => {
      console.log('My peer id: ' + id);
    });

    peer.on('call', _call => {
      /* set call globally*/
      console.log('calling', deviceId);
      call = _call;

      _call.on('stream', function (stream) {
        peerStream.value = stream
      });
    });
  }, []);

  return useMemo(
    () => ({
      peerStream,
    }),
    [peerStream],
  );
};
