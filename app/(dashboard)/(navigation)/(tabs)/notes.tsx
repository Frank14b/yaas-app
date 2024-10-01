import {
  AnimateSlideInView,
  ParallaxScrollView,
  ThemedConfirmDialog,
  ThemedNoDataFound,
  ThemedText,
  ThemedView,
} from "@/components";

import { NoteListItem } from "@/components/dashboard";

import { useTabNavigationContext } from "@/contexts";
import { useAppActionSheet, useNotes } from "@/hooks";
import { useUserStore } from "@/stores";
import { ResultNoteDto } from "@/types";
import { Href, router, useNavigation } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet } from "react-native";

export default function NotesScreen() {
  //
  const navigation = useNavigation();
  const { isAdmin, user } = useUserStore();
  const { slidePosition, TAB_SCREENS } = useTabNavigationContext();
  const { useGetNotes, deleteNote } = useNotes();
  const getNotes = useGetNotes();
  const { openActionSheet } = useAppActionSheet({});

  const [showConfirmation, setShowConfirmation] = useState<{
    status: boolean;
    item?: ResultNoteDto;
  }>({ status: false });
  const handleCloseConfirmation = () => setShowConfirmation({ status: false });

  const handleDelete = useCallback(async () => {
    setShowConfirmation({ status: false });
    await deleteNote.mutateAsync(showConfirmation.item?.id ?? 0);
    getNotes.refetch();
  }, [showConfirmation, setShowConfirmation]);

  const handleOpenDetails = (item: ResultNoteDto) => {
    router.push(`(details)/note?id=${item.id}` as Href);
  };

  const handleHeaderIconPress = useCallback((action: string) => {
    if (action === "ADD") {
      router.push("(forms)/note" as Href);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      header: () => <>{TAB_SCREENS[3].header?.(handleHeaderIconPress)}</>,
    });
  }, []);

  const handleLongPress = useCallback((item: ResultNoteDto) => {
    openActionSheet([
      {
        title: `Edit`,
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => {},
        isHidden: !isAdmin,
      },
      {
        title: `Delete`,
        destructiveBtn: false,
        cancelBtn: false,
        callBackFn: () => setShowConfirmation({ status: true, item }),
        isHidden: !isAdmin,
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
    if (getNotes.isLoading) return <ThemedText>Loading...</ThemedText>;

    if (getNotes.data?.data?.data?.length == 0)
      return <ThemedNoDataFound text="Notes no found"></ThemedNoDataFound>;

    return getNotes.data?.data?.data.map((item, index) => {
      return (
        <NoteListItem
          press={handleOpenDetails}
          longPress={() => item.users.id == user?.id && handleLongPress(item)}
          key={index}
          item={item}
        />
      );
    });
  }, [getNotes.data, user]);

  return (
    <>
      <AnimateSlideInView duration={200} position={slidePosition}>
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
          headerImage={
            <Image
              // source={require("@/assets/images/hand-solidarity.png")}
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
