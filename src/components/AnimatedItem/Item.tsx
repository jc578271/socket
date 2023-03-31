import React, { memo, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { useUpdateEffect } from "react-use";

interface Props<T> extends PropsWithChildren {
  animatedData: SharedValue<T[]>;
  item: T;
  update: boolean;
}

export const AnimatedItem = memo(<T extends unknown>({ animatedData, children, item, update }: Props<T>) => {
  const height = useSharedValue(0)
  const opacity = useSharedValue(0)
  const contentHeight = useSharedValue(0)
  const [mounted, setMounted] = useState(false)

  useUpdateEffect(() => {
    console.log('okok');
    // console.log("contentHeight.value", _contentHeight);
    height.value = withTiming(contentHeight.value, {duration: 200})
    opacity.value = withTiming(1, {duration: 400})
  }, [mounted])

  // console.log(update);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedData.value.indexOf(item) === -1 ?
        withTiming(0, {duration: 200})
        : height.value,
      opacity: animatedData.value.indexOf(item) === -1 ?
        withTiming(0, {duration: 100})
        : opacity.value,
    }
  }, [update])

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    contentHeight.value = e.nativeEvent.layout.height
    if (!mounted) setMounted(true)
  }, [])

  return <Animated.View style={[animatedStyle, {overflow: "scroll"}]}>
    <View onLayout={onLayout}>
      {children}
    </View>
  </Animated.View>
})
