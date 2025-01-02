import { Card } from "@/components/Card";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonStats } from "@/components/pokemon/PokemonStats";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import {
  baseStat,
  formatSize,
  formatWeight,
  getPokemonArtWork,
} from "@/functions/pokemon";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { useRef, useState } from "react";

export default function Pokemon() {
  const params = useLocalSearchParams() as { id: string };
  const [id, setId] = useState(parseInt(params.id, 10));
  const offset = useRef(1);
  const pager = useRef<PagerView>(null);

  const onPageSelected = (e: { nativeEvent: { position: number } }) => {
    offset.current = e.nativeEvent.position - 1;
  };

  const onStateChanged = (e: { nativeEvent: { pageScrollState: string } }) => {
    if (e.nativeEvent.pageScrollState != "idle") {
      return;
    }
    if (offset.current === -1 && id == 2) {
      return;
    }
    if (offset.current === 1 && id == 151) {
      return;
    }
    if (offset.current !== 0) {
      setId(id + offset.current);
      offset.current = 0;
      pager.current?.setPageWithoutAnimation(1);
    }
  };

  const onNext = () => {
    pager.current?.setPage(2 + offset.current);
  };
  const onPrevious = () => {
    pager.current?.setPage(0);
  };

  return (
    <PagerView
      ref={pager}
      onPageSelected={onPageSelected}
      onPageScrollStateChanged={onStateChanged}
      initialPage={1}
      style={{ flex: 1 }}
    >
      <PokemonView
        key={id - 1}
        id={id - 1}
        onNext={onNext}
        onPrevious={onPrevious}
      />
      <PokemonView key={id} id={id} onNext={onNext} onPrevious={onPrevious} />
      <PokemonView
        key={id + 1}
        id={id + 1}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </PagerView>
  );
}

type Props = {
  id: number;
  onPrevious: () => void;
  onNext: () => void;
};

function PokemonView({ id, onPrevious, onNext }: Props) {
  const colors = useThemeColors();
  const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: id });
  const { data: species } = useFetchQuery("/pokemon-species/[id]", {
    id: id,
  });
  const mainType = pokemon?.types?.[0].type.name;
  const colorType = mainType ? Colors.type[mainType] : colors.tint;
  const types = pokemon?.types ?? [];
  const bio = species?.flavor_text_entries
    ?.find(({ language }) => language.name == "en")
    ?.flavor_text.replaceAll("\n", ". ");
  const stats = pokemon?.stats ?? baseStat;

  //permet de jouer un fichier audio mais impossible puisque IOS ne prends pas en charge ce type de fichier '.ogg'
  const onImagePress = async () => {
    const cry = pokemon?.cries.latest;
    if (!cry) {
      return;
    }
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: cry,
      },
      { shouldPlay: true }
    );
    sound.playAsync();
  };
  const isFirst = id == 1;
  const isLast = id == 151;

  return (
    <RootView backgroundColor={colorType}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Image Pokeball en arrière-plan */}
        <Image
          source={require("@/assets/images/pokeball_big.png")}
          style={styles.pokeball}
        />

        {/* En-tête */}
        <Row style={styles.header}>
          {/* Bouton retour */}
          <Pressable onPress={router.back}>
            <Row gap={8}>
              <Image
                source={require("@/assets/images/back.png")}
                style={styles.img}
              />
              <ThemedText
                variant="headline"
                color="grayWhite"
                style={{ textTransform: "capitalize" }}
              >
                {pokemon?.name}
              </ThemedText>
            </Row>
          </Pressable>

          {/* ID du Pokémon */}
          <ThemedText variant="subtitle2" color="grayWhite">
            #{id.toString().padStart(3, "0")}
          </ThemedText>
        </Row>

        {/* Corps de la carte */}
        <Card style={[styles.card, { overflow: "visible" }]}>
          {/* Image du Pokémon avec navigation */}
          <Row style={styles.imgRow}>
            {isFirst ? (
              <View style={{ width: 24, height: 24 }} />
            ) : (
              <Pressable onPress={onPrevious}>
                <Image
                  width={24}
                  height={24}
                  source={require("@/assets/images/left.png")}
                />
              </Pressable>
            )}
            <Pressable onPress={onImagePress}>
              <Image
                width={200}
                height={200}
                source={{
                  uri: getPokemonArtWork(id),
                }}
              />
            </Pressable>
            {isLast ? (
              <View style={{ width: 24, height: 24 }} />
            ) : (
              <Pressable onPress={onNext}>
                <Image
                  width={24}
                  height={24}
                  source={require("@/assets/images/right.png")}
                />
              </Pressable>
            )}
          </Row>

          {/* Types de Pokémon */}
          <Row gap={16} style={{ height: 20 }}>
            {types.map((type) => (
              <PokemonType typeName={type.type.name} key={type.type.name} />
            ))}
          </Row>

          {/* Section "About" */}
          <ThemedText variant="subtitle1" style={{ color: colorType }}>
            About
          </ThemedText>
          <Row>
            <PokemonSpec
              style={{
                borderStyle: "solid",
                borderRightWidth: 1,
                borderColor: colors.grayLight,
              }}
              title={formatWeight(pokemon?.weight)}
              description="Weight"
              image={require("@/assets/images/weight.png")}
            />
            <PokemonSpec
              style={{
                borderStyle: "solid",
                borderRightWidth: 1,
                borderColor: colors.grayLight,
              }}
              title={formatSize(pokemon?.height)}
              description="Size"
              image={require("@/assets/images/straighten.png")}
            />
            <PokemonSpec
              title={pokemon?.moves
                .slice(0, 2)
                .map((m) => m.move.name)
                .join("\n")}
              description="Moves"
            />
          </Row>
          <ThemedText>{bio}</ThemedText>

          {/* Stats de base */}
          <ThemedText variant="subtitle1" style={{ color: colorType }}>
            Base stats
          </ThemedText>
          <View style={{ alignSelf: "stretch" }}>
            {stats.map((stat) => (
              <PokemonStats
                key={stat.stat.name}
                name={stat.stat.name}
                value={stat.base_stat}
                color={colorType}
              />
            ))}
          </View>
        </Card>
      </SafeAreaView>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 20,
    justifyContent: "space-between",
  },
  pokeball: {
    opacity: 0.1,
    position: "absolute",
    width: 208,
    height: 208,
    right: 8,
    top: 8,
  },
  img: {
    width: 32,
    height: 32,
  },
  card: {
    marginTop: 144,
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
    alignItems: "center",
  },
  imgRow: {
    position: "absolute",
    top: -140,
    zIndex: 2,
    justifyContent: "space-between",
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});
