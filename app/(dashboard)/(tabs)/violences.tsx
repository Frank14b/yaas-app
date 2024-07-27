import {
  AnimateSlideInView,
  ParallaxScrollView,
  ThemeFAB,
  ThemedDialog,
  ThemedText,
  ThemedView,
} from "@/components";
import { FlatList, Image, StyleSheet } from "react-native";
import { useMemo, useState } from "react";
import { ViolenceForm } from "@/components/dashboard";
import { useTabNavigationContext } from "@/contexts/TabNavigationContext";
import { useViolences } from "@/hooks";

export default function ViolenceScreen() {
  //
  const { slidePosition } = useTabNavigationContext();

  const { getViolences } = useViolences();

  const [openForm, setOpenForm] = useState<boolean>(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const violences = useMemo(() => {
    if (getViolences.isLoading) return <ThemedText>Loading...</ThemedText>;
    if (!getViolences.data?.status)
      return <ThemedText>Violence no found</ThemedText>;

    const formattedData = getViolences.data.data?.data.map((item) => {
      return {
        title: item.details,
      };
    });

    return (
      <FlatList
        data={formattedData}
        renderItem={({ item }) => <ThemedText>{item.title}</ThemedText>}
      ></FlatList>
    );
  }, [getViolences.data]);

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

          <ThemedView style={styles.container}>{violences}</ThemedView>
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
