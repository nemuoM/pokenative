import { StyleSheet, View, ViewProps } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";

type Props = ViewProps & {
  color: string;
  name: string;
  value: number;
};

function statShortName(name: string): string {
  return name
    .replaceAll("-", "")
    .replaceAll("special", "S-")
    .replaceAll("attack", "ATK")
    .replaceAll("defense", "DEF")
    .replaceAll("speed", "SPD")
    .toUpperCase();
}

export function PokemonStats({ style, name, value, color, ...rest }: Props) {
  const colors = useThemeColors();
  const sharedValue = useSharedValue(value);
  const barInnerStyle = useAnimatedStyle(() => {
    return {
      flex: sharedValue.value,
    };
  });
  const barBGStyle = useAnimatedStyle(() => {
    return {
      flex: 255 - sharedValue.value,
    };
  });

  //Important d'utiliser le useEffect() pour que l'animation se fasse
  useEffect(() => {
    sharedValue.value = withSpring(value);
  }, [value]);

  return (
    <Row style={[style, styles.root]} {...rest} gap={8}>
      <View style={[styles.name, { borderColor: colors.grayLight }]}>
        <ThemedText variant="subtitle3" style={{ color: color }}>
          {statShortName(name)}
        </ThemedText>
      </View>
      <View style={[styles.number]}>
        <ThemedText>{value.toString().padStart(3, "0")}</ThemedText>
      </View>
      <Row style={styles.bar}>
        <Animated.View
          style={[styles.barInner, { backgroundColor: color }, barInnerStyle]}
        />
        <Animated.View
          style={[styles.barBG, { backgroundColor: color }, barBGStyle]}
        />
      </Row>
    </Row>
  );
}

const styles = StyleSheet.create({
  root: {},
  name: {
    width: 40,
    paddingRight: 8,
    borderRightWidth: 1,
    borderStyle: "solid",
  },
  number: {
    width: 23,
  },
  bar: {
    flex: 1,
    borderRadius: 20,
    height: 4,
    overflow: "hidden",
  },
  barInner: {
    height: 4,
  },
  barBG: {
    height: 4,
    opacity: 0.24,
  },
});
