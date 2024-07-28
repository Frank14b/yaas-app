import {
  AnimateSlideInView,
  ParallaxScrollView,
  ThemedDialog,
  ThemedText,
  ThemedView,
} from "@/components";
import { Image, StyleSheet } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ViolenceForm } from "@/components/dashboard";
import { useTabNavigationContext } from "@/contexts";
import { useViolences } from "@/hooks";
import { Colors } from "@/constants";
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
    if (action === "add") {
      handleOpenForm();
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      header: () => <>{TAB_SCREENS[1].header?.(handleHeaderIconPress)}</>,
    });
  }, []);

  const violences = useMemo(() => {
    //
    if (getViolences.isLoading) return <ThemedText>Loading...</ThemedText>;
    if (!getViolences.data?.status)
      return <ThemedText>Violence no found</ThemedText>;

    return getViolences.data.data?.data.map((item, index) => {
      return (
        <ThemedView
          lightColor="#eee"
          darkColor={Colors.secondaryDark}
          style={[styles.itemBox]}
          key={index}
        >
          <Image
            source={require("@/assets/images/parallax/violence.avif")}
            style={styles.itemUserPhoto}
          />
          <ThemedView style={{ backgroundColor: "transparent", flex: 1 }}>
            <ThemedText style={styles.itemUserName}>
              {item.users.firstname} {item.users.lastname}
            </ThemedText>
            <ThemedText>{item.nature}</ThemedText>
            <ThemedText type="small">
              {item.ref} | {new Date(`${item.created_at}`).toDateString()}
            </ThemedText>
            <ThemedText type="small" style={styles.itemFlag}>
              {item.flags.name}
            </ThemedText>
            <ThemedText type="small" style={styles.itemType}>
              Type: {item.types.name}
            </ThemedText>
          </ThemedView>
        </ThemedView>
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
  itemBox: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },
  itemUserPhoto: {
    width: 50,
    height: 50,
    borderRadius: 50,
    objectFit: "cover",
  },
  itemUserName: {
    textTransform: "capitalize",
    fontWeight: "700",
  },
  itemFlag: {
    position: "absolute",
    right: 5,
    top: 0,
  },
  itemType: {},
});
