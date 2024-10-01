import {
  AnimateSlideInView,
  ParallaxScrollView,
  ThemedConfirmDialog,
  ThemedNoDataFound,
  ThemedText,
  ThemedView,
} from "@/components";

import { Image, StyleSheet } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ViolenceListItem } from "@/components/dashboard";
import { useTabNavigationContext } from "@/contexts";
import { useAppActionSheet, useViolences } from "@/hooks";
import { Href, useNavigation, useRouter } from "expo-router";
import { ResultViolenceDto } from "@/types";
import { useUserStore } from "@/stores";

export default function ViolenceScreen() {
  //
  const navigation = useNavigation();
  const router = useRouter();
  const { isAdmin, user } = useUserStore();
  const { slidePosition, TAB_SCREENS } = useTabNavigationContext();
  const { openActionSheet } = useAppActionSheet({});
  const { useGetViolences, deleteViolence, reportViolence, assignViolence } =
    useViolences();
  const getViolences = useGetViolences();

  const [showConfirmation, setShowConfirmation] = useState<{
    status: boolean;
    item?: ResultViolenceDto;
  }>({ status: false });
  const handleCloseConfirmation = () => setShowConfirmation({ status: false });

  const handleDelete = useCallback(async () => {
    setShowConfirmation({ status: false });
    await deleteViolence.mutateAsync(showConfirmation.item?.id as number);
    getViolences.refetch();
  }, [showConfirmation, setShowConfirmation]);

  const handleReport = useCallback(async (id: number) => {
    await reportViolence.mutateAsync(id);
    getViolences.refetch();
  }, []);

  const handleAssign = useCallback(async (id: number) => {
    await assignViolence.mutateAsync(id);
    getViolences.refetch();
  }, []);

  const handleOpenDetails = (item: ResultViolenceDto) => {
    router.push(`(details)/violence?id=${item.id}` as Href);
  };

  const handleHeaderIconPress = useCallback((action: string, id?: number) => {
    if (action === "ADD") {
      router.push("(forms)/violence" as Href);
    } else if (action === "EDIT") {
      router.push(`(forms)/violence?id=${id}` as Href);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      header: () => <>{TAB_SCREENS[1].header?.(handleHeaderIconPress)}</>,
    });
  }, []);

  const handleLongPress = useCallback(
    (item: ResultViolenceDto) => {
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
          callBackFn: () => handleHeaderIconPress("EDIT", item.id),
          isHidden:
            user?.id == item.created_by || item.agent_id == null ? false : true,
        },
        {
          title: `Delete`,
          destructiveBtn: false,
          cancelBtn: false,
          callBackFn: () => setShowConfirmation({ status: true, item }),
          isHidden:
            user?.id == item.created_by || item.agent_id == null ? false : true,
        },
        {
          title: `Assign To Me`,
          destructiveBtn: false,
          cancelBtn: false,
          callBackFn: () => handleAssign(item.id),
          isHidden:
            isAdmin && (item.agent_id == 0 || item.agent_id == null)
              ? false
              : true,
        },
        {
          title: `Report`,
          destructiveBtn: false,
          cancelBtn: false,
          callBackFn: () => handleReport(item.id),
          isHidden:
            isAdmin && (item.agent_id == 0 || item.agent_id == null)
              ? false
              : true,
        },
        {
          title: `Cancel`,
          destructiveBtn: false,
          cancelBtn: true,
          callBackFn: () => {},
        },
      ]);
    },
    [isAdmin]
  );

  const violences = useMemo(() => {
    if (getViolences.isLoading) return <ThemedText>Loading...</ThemedText>;

    if (getViolences.data?.data?.data.length == 0)
      return <ThemedNoDataFound text="Violences no found"></ThemedNoDataFound>;

    return getViolences.data?.data?.data.map((item, index) => {
      return (
        <ViolenceListItem
          press={handleOpenDetails}
          longPress={handleLongPress}
          key={index}
          item={item}
        />
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
