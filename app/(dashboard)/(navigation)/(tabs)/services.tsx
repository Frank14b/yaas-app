import {
  AnimateSlideInView,
  ParallaxScrollView,
  ThemedConfirmDialog,
  ThemedNoDataFound,
  ThemedText,
  ThemedView,
} from "@/components";

import { ServiceListItem } from "@/components/dashboard";
import { useTabNavigationContext } from "@/contexts";
import { useAppActionSheet, useServices } from "@/hooks";
import { useUserStore } from "@/stores";
import { ResultServiceDto } from "@/types";
import { Href, router, useNavigation } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet } from "react-native";

export default function ServicesScreen() {
  //
  const navigation = useNavigation();
  const { isAdmin } = useUserStore();
  const { slidePosition, TAB_SCREENS } = useTabNavigationContext();
  const { useGetServices, deleteService } = useServices();
  const getServices = useGetServices();
  const { openActionSheet } = useAppActionSheet({});

  const [showConfirmation, setShowConfirmation] = useState<{
    status: boolean;
    item?: ResultServiceDto;
  }>({ status: false });
  const handleCloseConfirmation = () => setShowConfirmation({ status: false });

  const handleDelete = useCallback(async () => {
    setShowConfirmation({ status: false });
    await deleteService.mutateAsync(showConfirmation.item?.id ?? 0);
    getServices.refetch();
  }, [showConfirmation, setShowConfirmation]);

  const handleOpenDetails = (item: ResultServiceDto) => {
    router.push(`(details)/service?id=${item.id}` as Href);
  };

  const handleHeaderIconPress = useCallback((action: string) => {
    if (action === "ADD") {
      router.push("(forms)/service" as Href);
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
        title: `Edit`,
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => {},
        isHidden: !isAdmin
      },
      {
        title: `Delete`,
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => setShowConfirmation({ status: true, item }),
        isHidden: !isAdmin
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

    if (getServices.data?.data?.data.length == 0)
      return <ThemedNoDataFound text="Services no found"></ThemedNoDataFound>;

    return getServices.data?.data?.data.map((item, index) => {
      return (
        <ServiceListItem
          press={handleOpenDetails}
          longPress={() => {}}
          key={index}
          item={item}
        />
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
              // source={require("@/assets/images/parallax/services.webp")}
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

      {showConfirmation.status && (
        <ThemedConfirmDialog
          message={`Are you sure you want to delete ${showConfirmation.item?.ref}?`}
          visible={showConfirmation.status}
          cancelFn={handleCloseConfirmation}
          confirmFn={handleDelete}
        />
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
