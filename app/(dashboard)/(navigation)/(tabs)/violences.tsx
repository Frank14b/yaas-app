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
import { useAppActionSheet, useViolences } from "@/hooks";
import { useNavigation, useRouter } from "expo-router";
import { ResultViolenceDto } from "@/types";

export default function ViolenceScreen() {
  //
  const navigation = useNavigation();
  const router = useRouter();
  const { slidePosition, TAB_SCREENS } = useTabNavigationContext();
  const { openActionSheet } = useAppActionSheet({});
  const getViolences = useViolences().getViolences();

  const [openForm, setOpenForm] = useState<boolean>(false);
  const handleCloseForm = () => setOpenForm(false);

  const handleHeaderIconPress = useCallback((action: string) => {
    if (action === "ADD") {
      router.push("(forms)/violence");
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      header: () => <>{TAB_SCREENS[1].header?.(handleHeaderIconPress)}</>,
    });
  }, []);

  const handleLongPress = useCallback((item: ResultViolenceDto) => {
    openActionSheet([
      {
        title: `${item.ref}`,
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => {},
      },
      {
        title: `Edit`,
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => {},
      },
      {
        title: `Delete`,
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => {},
      },
      {
        title: `Cancel`,
        destructiveBtn: false,
        cancelBtn: true,
        callBackFn: () => {},
      },
    ]);
  }, []);

  const violences = useMemo(() => {
    if (getViolences.isLoading) return <ThemedText>Loading...</ThemedText>;
    if (!getViolences.data?.status)
      return <ThemedText>Violence no found</ThemedText>;

    return getViolences.data.data?.data.map((item, index) => {
      return (
        <ViolenceListItem longPress={handleLongPress} key={index} item={item} />
      );
    });
  }, [getViolences.data]);

  return (
    <>
      <AnimateSlideInView duration={200} position={slidePosition}>
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
          headerImage={
            <Image
              source={require("@/assets/images/parallax/violence.jpg")}
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
