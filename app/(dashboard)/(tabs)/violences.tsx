import {
  ParallaxScrollView,
  ThemeFAB,
  ThemedDialog,
  ThemedText,
  ThemedView,
} from "@/components";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useCallback, useState } from "react";

export default function ViolenceScreen() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const handleOpenForm = useCallback(() => {
    setOpenForm(!openForm);
  }, [openForm, setOpenForm]);

  const _renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => {}}>
      <ThemedText>{item.title}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/parallax/violence.avif")}
            style={styles.reactLogo}
          />
        }
        style={styles.parallaxView}
      >
        <ThemedView style={[styles.titleContainer, styles.container]}>
          <ThemedText type="title">Violences</ThemedText>
        </ThemedView>

        <ThemedView style={styles.container}>
          {/* <FlatList
            data={[{ title: "Frank Fontcha" }]}
            renderItem={_renderItem}
          ></FlatList> */}
        </ThemedView>
      </ParallaxScrollView>

      <ThemeFAB position="bottom-right" onPress={handleOpenForm} />

      <ThemedDialog
        title="New Violence"
        open={openForm}
        handleClose={handleOpenForm}
      />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
  },
  parallaxView: {
    height: 160,
  },
  reactLogo: {
    height: 180,
    width: "100%",
    top: 0,
    left: 0,
    position: "absolute",
  },
});
