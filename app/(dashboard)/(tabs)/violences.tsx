import {
  AnimateSlideInView,
  ParallaxScrollView,
  ThemeFAB,
  ThemedDialog,
  ThemedText,
  ThemedView,
} from "@/components";
import { Image, StyleSheet } from "react-native";
import { useState } from "react";
import { ViolenceForm } from "@/components/dashboard";
import { useTabNavigationContext } from "@/contexts/TabNavigationContext";

export default function ViolenceScreen() {
  //
  const { slidePosition } = useTabNavigationContext();

  const [openForm, setOpenForm] = useState<boolean>(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  return (
    <>
      <AnimateSlideInView duration={200} position={slidePosition}>
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
      </AnimateSlideInView>

      <ThemeFAB name="add" position="bottom-right" onPress={handleOpenForm} />

      <ThemedDialog
        title="New Violence"
        open={openForm}
        handleClose={handleCloseForm}
      >
        <ViolenceForm />
      </ThemedDialog>
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
