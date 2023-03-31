import { useCallback, useEffect, useMemo, useState } from "react";
import { interactManager } from "@true/utils/wait";
import { runOnJS, runOnUI, useSharedValue, useWorkletCallback } from "react-native-reanimated";

export const DURATION = 200

export const useAnimatedItem = (data: any[]) => {
  const animatedData = useSharedValue(data)
  const [__data, _setData] = useState(data)

  const sub = useCallback(( _data: any[]) => {
    interactManager(() => {
      animatedData.value = _data
      _setData(_data)
    }, DURATION)
  }, [])

  const onUI = useWorkletCallback((_data: any[]) => {
    /* when add */
    if (animatedData.value.length < _data.length) {
      animatedData.value = _data
      runOnJS(_setData)(_data)
    }
    /* when sub */
    if (animatedData.value.length > _data.length) {
      runOnJS(sub)(_data)
    }
  }, [])

  useEffect(() => {
    runOnUI(onUI)(data)
  }, [data.length])

  return useMemo(() => ({ animatedData, data: __data }), [__data])
}
