import { Image, StyleSheet, TextInput, View } from "react-native";
import { Row } from "./Row";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  value: string;
  onChange: (s: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  const colors = useThemeColors();
  return (
    <Row
      style={[styles.wrapper, { backgroundColor: colors.grayWhite }]}
      gap={8}
    >
      <Image
        source={require("@/assets/images/search.png")}
        style={styles.img}
      />
      <TextInput style={styles.input} onChangeText={onChange} value={value} />
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 16,
    height: 32,
    paddingHorizontal: 12,
  },
  img: {
    width: 16,
    height: 16,
  },
  input: {
    flex: 1,
    height: 16,
    fontSize: 10,
    lineHeight: 16,
  },
});
