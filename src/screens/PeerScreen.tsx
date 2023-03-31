import {ScreenWrapper} from '@true/components/ScreenWrap';
import {DynamicHeader} from '@true/components/Header/DynamicHeader';
import React, {memo, useCallback, useEffect} from 'react';
import {UIButton} from '@true/components/UIButton';
import {mediaDevices} from 'react-native-webrtc';
import {call, peer} from '@/components/SocketProvider/hooks/usePeerHandler';
import {deviceId} from '@/components/SocketProvider/constants';
import {useSocket} from '@/components/SocketProvider';
import {StyleSheet, View} from 'react-native';
import Animated, {useAnimatedReaction} from 'react-native-reanimated';

/* -- get local media device -- */
let mediaConstraints = {
  audio: false,
  video: {
    frameRate: 30,
    facingMode: 'user',
  },
};

const getLocalMediaStream = async () => {
  return await mediaDevices.getUserMedia(mediaConstraints);
};

// let call: any = null;

export const PeerScreen = memo(() => {
  const {peerStream} = useSocket();

  /* -- call -- */
  const onCall = useCallback(async () => {
    const localMediaStream = await getLocalMediaStream();
    peer.call('f116d106ec272dde', localMediaStream);
  }, []);

  /* -- answer -- */
  const onAnswer = useCallback(async () => {
    const localMediaStream = await getLocalMediaStream();
    call?.answer(localMediaStream);
  }, [call]);

  useAnimatedReaction(
    () => peerStream.value,
    _stream => {
      console.log('stream', _stream);
    },
    [],
  );

  // const callingStyles = useAnimatedStyle(() => {
  //   console.log(peerListener.value?.['call']);
  //   return {};
  // }, []);

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Peer Screen'} />
      <Animated.Text>Calling</Animated.Text>
      <View style={{flexDirection: 'row'}}>
        <UIButton title={'call'} onPress={onCall} style={styles.button} />
        <UIButton title={'answer'} onPress={onAnswer} style={styles.button} />
      </View>
    </ScreenWrapper>
  );
});

const styles = StyleSheet.create({
  button: {
    padding: 8,
    backgroundColor: 'yellow',
    borderWidth: 1,
    margin: 4,
  },
});
