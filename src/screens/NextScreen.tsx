import {DynamicHeader, ScreenWrapper, UITextInput} from '@true/components';
import React, {memo, useRef} from 'react';
import {UISelectorInput} from '@true/components/UIInput/UISelectorInput';
import {View} from 'react-native';
import {UIAttachmentInput} from '@true/components/UIInput/UIAttachmentInput';
import {UICheckboxInput} from '@true/components/UIInput/UICheckboxInput';
import Animated, {useAnimatedScrollHandler} from 'react-native-reanimated';
import {useAnimatedRefScrollHandler} from '@true/hooks/useAnimatedRefScrollHandler';
import {BottomButton} from '@true/components/Button/BottomButton';
import {UIBottomButton} from '@true/components/UIButton/BottomButton';

export const NextScreen = memo(() => {
  const ref = useRef<Animated.ScrollView>(null);

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Next'} />
      {/*<View style={{flexDirection: "row"}}>*/}
      <Animated.ScrollView scrollEventThrottle={16} ref={ref}>
        <UITextInput
          // style={{flex: 1}}
          keyName={'ok'}
        />
        <UISelectorInput
          // style={{flex: 1}}
          keyName={'hi'}
          title={'Hi'}
          options={['Section A', 'Section B']}
          optionMap={{
            'Section A': [{label: 'item', value: 'id'}],
          }}
          multiple={true}
        />
        <UIAttachmentInput
          keyName={'file'}
          onChangeValue={(keyName, value) => {
            'worklet';
            console.log(keyName, value);
          }}
          multiple={true}
        />
        <UICheckboxInput
          title={'HIHI'}
          keyName={'checkbox'}
          options={[
            {label: 'ok', value: 'ok'},
            {label: 'ok1', value: 'ok1'},
          ]}
          onChangeValue={(keyName, value) => {
            'worklet';
            console.log(keyName, value);
          }}
        />
      </Animated.ScrollView>
      <UIBottomButton
        hideBottomSpace={true}
        buttons={[
          {
            title: 'ok',
            onPress: () => {
              console.log('ok');
            },
          },
          {title: 'ok2'},
        ]}
      />
      {/*</View>*/}
    </ScreenWrapper>
  );
});
