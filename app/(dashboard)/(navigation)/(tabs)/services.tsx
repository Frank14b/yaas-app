import {
  AnimateSlideInView,
  ParallaxScrollView,
  ThemedDialog,
  ThemedText,
  ThemedView,
} from "@/components";

import { ServiceDetails, ServiceListItem } from "@/components/dashboard";
import { useTabNavigationContext } from "@/contexts";
import { useAppActionSheet, useServices } from "@/hooks";
import { ResultServiceDto } from "@/types";
import { router, useNavigation } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet } from "react-native";

export default function ServicesScreen() {
  //
  const navigation = useNavigation();
  const { slidePosition, TAB_SCREENS } = useTabNavigationContext();
  const { useGetServices } = useServices();
  const getServices = useGetServices();
  const { openActionSheet } = useAppActionSheet({});

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ResultServiceDto | null>(
    null
  );
  const handleCloseDetails = () => setShowDetails(false);
  const handleOpenDetails = (item: ResultServiceDto) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handleHeaderIconPress = useCallback((action: string) => {
    if (action === "ADD") {
      router.push("(forms)/service");
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      header: () => <>{TAB_SCREENS[2].header?.(handleHeaderIconPress)}</>,
    });
  }, []);

  const handleLongPress = useCallback((item: ResultServiceDto) => {
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

  const services = useMemo(() => {
    if (getServices.isLoading) return <ThemedText>Loading...</ThemedText>;
    if (!getServices.data?.status)
      return <ThemedText>Service no found</ThemedText>;

    return getServices.data.data?.data.map((item, index) => {
      return (
        <ServiceListItem press={handleOpenDetails} longPress={handleLongPress} key={index} item={item} />
      );
    });
  }, [getServices.data]);

  return (
    <>
      <AnimateSlideInView duration={200} position={slidePosition}>
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
          headerImage={
            <Image
              source={require("@/assets/images/parallax/services.webp")}
              style={styles.reactLogo}
            />
          }
          style={styles.parallaxView}
        >
          <ThemedView style={{ flex: 1, padding: 10, gap: 10 }}>
            {services}
          </ThemedView>
        </ParallaxScrollView>
      </AnimateSlideInView>

      {selectedItem && showDetails && (
        <ThemedDialog
          title={"Details"}
          open={showDetails}
          handleClose={handleCloseDetails}
        >
          <ServiceDetails item={selectedItem} />
        </ThemedDialog>
      )}
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
