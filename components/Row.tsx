import { type ViewProps, View, ViewStyle } from "react-native";
/**
 * Fichier qui permet de définir une div où les élément sont en lignes
 */
type Props = ViewProps & {
  gap?: number;
};

export function Row({ style, gap, ...rest }: Props) {
  return (
    <View
      style={[rowStyle, style, gap ? { gap: gap } : undefined]}
      {...rest}
    ></View>
  );
}

const rowStyle = {
  flex: 0,
  flexDirection: "row",
  alignItems: "center",
} satisfies ViewStyle;
