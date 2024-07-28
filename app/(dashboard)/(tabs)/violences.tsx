import {
  AnimateSlideInView,
  ParallaxScrollView,
  ThemedDialog,
  ThemedText,
  ThemedView,
} from "@/components";
import { Image, StyleSheet } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ViolenceForm, ViolenceListItem } from "@/components/dashboard";
import { useTabNavigationContext } from "@/contexts";
import { useViolences } from "@/hooks";
import { useNavigation } from "expo-router";

export default function ViolenceScreen() {
  //
  const navigation = useNavigation();
  const { slidePosition, TAB_SCREENS } = useTabNavigationContext();
  const { getViolences } = useViolences();

  const [openForm, setOpenForm] = useState<boolean>(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleHeaderIconPress = useCallback((action: string) => {
    if (action === "ADD") {
      handleOpenForm();
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      header: () => <>{TAB_SCREENS[1].header?.(handleHeaderIconPress)}</>,
    });
  }, []);

  const violences = useMemo(() => {
    if (getViolences.isLoading) return <ThemedText>Loading...</ThemedText>;
    if (!getViolences.data?.status)
      return <ThemedText>Violence no found</ThemedText>;

    return getViolences.data.data?.data.map((item, index) => {
      return <ViolenceListItem key={index} item={item} />;
    });
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
          <ThemedView style={{ flex: 1, padding: 10, gap: 10 }}>
            {violences}
          </ThemedView>
        </ParallaxScrollView>
      </AnimateSlideInView>

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
