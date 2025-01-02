import { useThemeColors } from "@/hooks/useThemeColors";
import { useEffect } from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type Props = ViewProps & {
  backgroundColor?: string;
};

export function RootView({ style, backgroundColor, ...rest }: Props) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  {
    /*Tout ça c'est avec reanimated une librairie pour faire des animations avec react native */
  }
  const progress = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [colors.tint, backgroundColor ?? colors.tint]
      ),
    };
  }, [backgroundColor]);

  useEffect(() => {
    if (backgroundColor) {
      //Pour être sur que ça fonctionne
      progress.value = 0;
      progress.value = withTiming(1, {
        duration: 700,
        easing: Easing.out(Easing.quad),
        reduceMotion: ReduceMotion.System,
      });
    }
  }, [backgroundColor]);

  if (!backgroundColor) {
    return (
      <SafeAreaView
        style={[rootStyles, { backgroundColor: colors.tint }, style]}
        {...rest}
      />
    );
  }
  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle, style, rootStyles]}>
      <View style={[rootStyles, { flex: 1 }]} {...rest} />
    </Animated.View>
  );
}

const rootStyles = {
  flex: 1,
  padding: 4,
} satisfies ViewStyle;
