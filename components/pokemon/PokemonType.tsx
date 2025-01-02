import { Colors } from "@/constants/Colors";
import { View, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  typeName: keyof (typeof Colors)["type"];
};

export function PokemonType({ typeName }: Props) {
  return (
    <View style={[rootStyle, { backgroundColor: Colors.type[typeName] }]}>
      <ThemedText
        color="grayWhite"
        variant="subtitle3"
        style={{ textTransform: "capitalize" }}
      >
        {typeName}
      </ThemedText>
    </View>
  );
}

const rootStyle = {
  flex: 0,
  height: 20,
  paddingHorizontal: 8,
  borderRadius: 8,
  justifyContent: "center",
} satisfies ViewStyle;
