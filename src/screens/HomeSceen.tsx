import React, {useCallback, useRef, useState} from 'react';
import {memoForwardRef} from '@true/utils';
import {ScreenWrapper, UIFlashList} from '@true/components';
import {DynamicHeader} from '@true/components/Header/DynamicHeader';
import {Text, TextInput, View} from 'react-native';
import { useSocket} from '@/components/SocketProvider';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {ESocketEvent} from '@/components/SocketProvider/events';
import {interactManager} from '@true/utils/wait';
import {UIButton} from '@true/components/UIButton';
import {socketEmit} from '@/components/SocketProvider/utils';
import {styled} from '@true/global';
// import RNCallKeep from 'react-native-callkeep';
// import 'react-native-get-random-values';
// import {v4} from 'uuid';

// const socket = io("http://192.168.1.9:3000")

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const HomeScreen = memoForwardRef(() => {
  const {socketListener, messages} = useSocket();

  const message = useSharedValue('');

  const timeout = useRef<any>(null);

  const textInputRef = useRef<TextInput>(null);

  const animatedProps = useAnimatedProps(
    () => ({
      text: message.value,
    }),
    [],
  ) as any;

  const onChangeText = useCallback((text: string) => {
    message.value = text;
    socketEmit(ESocketEvent.CHAT_MESSAGE, text);
    socketEmit(ESocketEvent.TYPING, true);
    interactManager(
      () => {
        socketEmit(ESocketEvent.TYPING, false);
      },
      1000,
      true,
      timeout,
    );
  }, []);

  const animatedTypingStyle = useAnimatedStyle(
    () => ({
      opacity: socketListener.value[ESocketEvent.TYPING]?.params ? 1 : 0,
    }),
    [],
  );

  const [data, setData] = useState<any[]>([]);

  const setJSData = useCallback(__messages => {
    setData(__messages);
  }, []);

  // const hiihi = useDerivedValue(() => Array.isArray([]), [])

  useAnimatedReaction(
    () => messages.value,
    _messages => {
      // console.log(hiihi.value);
      runOnJS(setJSData)(_messages);
    },
    [],
  );
  // useEffect(() => {
  //   socket.on("chat-message", msg => {
  //     console.log("client", msg);
  //   })
  // }, [])

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Chats'} />
      <AnimatedTextInput
        ref={textInputRef}
        {...{animatedProps}}
        style={{
          borderWidth: 1,
          padding: 12,
        }}
        onChangeText={onChangeText}
      />
      <Animated.View style={animatedTypingStyle}>
        <Text>Typing...</Text>
      </Animated.View>
      <UIButton
        title={'Send'}
        onPress={() => {
          // console.log('acll', uuid);
          socketEmit(ESocketEvent.SEND_MESSAGE, message.value);

          // RNCallKeep.startCall(
          //   '2398yd289fh2938f23',
          //   '123123123',
          //   'wefwefewf',
          //   'number',
          //   false,
          // );
          // message.value = '';
        }}
        style={{backgroundColor: 'yellow', alignSelf: 'flex-end', padding: 8}}
      />
      <UIFlashList
        data={data}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row'}}>
            <SText>{item?.user as unknown as string}: </SText>
            <SText>{item?.msg as unknown as string}</SText>
          </View>
        )}
        estimatedItemSize={16.6}
      />
    </ScreenWrapper>
  );
});

const SText = styled.Text`
  color: ${p => p.theme.grey1};
`;
