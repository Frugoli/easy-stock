import { useCallback } from "react";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export function useAnimatedShake() {
  const shakeTranslateX = useSharedValue(0);

  const shake = useCallback(() => {
    const translationAmount = 1;
    const timingConfig = {
      duration: 80,
      easing: Easing.bezier(0.35, 0.7, 0.5, 0.7),
    };

    shakeTranslateX.value = withSequence(
      withTiming(translationAmount, timingConfig),
      withRepeat(withTiming(-translationAmount, timingConfig), 3, true),
      withSpring(0, {
        mass: 0.5,
      })
    );
  }, []);

  const reanimatedShakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeTranslateX.value }],
    };
  }, []);

  return { shake, reanimatedShakeStyle };
}
