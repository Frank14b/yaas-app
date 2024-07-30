import { ThemeFAB, ThemedText, ThemedView } from "@/components";
import { useAppActionSheet, useUsers } from "@/hooks";
import { ResultUserDto } from "@/types";
import { useCallback } from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function UsersScreen() {
  //
  const getUsers = useUsers().getUsers();
  const { openActionSheet } = useAppActionSheet({});

  const handleOpenActionSheet = useCallback(
    (item: ResultUserDto) => {
      openActionSheet([
        {
          title: `${item.username}`,
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
    },
    [openActionSheet]
  );

  const users = useCallback(
    (item: ResultUserDto) => {
      return (
        <TouchableOpacity onPress={() => handleOpenActionSheet(item)}>
          <ThemedView
            darkColor="#111"
            lightColor="#eee"
            style={styles.itemContainer}
          >
            <ThemedView
              darkColor="#111"
              lightColor="#eee"
              style={[styles.profileNameBox]}
            >
              <Image
                source={require("@/assets/images/parallax/services.webp")}
                style={styles.itemUserPhoto}
              />
              <ThemedView style={{ backgroundColor: "transparent", flex: 1 }}>
                <ThemedText style={styles.itemUserName}>
                  {item.firstname} {item.lastname}
                </ThemedText>
                <ThemedText>{item.email}</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </TouchableOpacity>
      );
    },
    [handleOpenActionSheet]
  );

  return (
    <>
      <ThemedView style={styles.container}>
        {getUsers.isLoading && <ThemedText>Loading...</ThemedText>}
        <FlatList
          data={getUsers.data?.data?.data}
          renderItem={(item) => users(item.item)}
        />
      </ThemedView>

      <ThemeFAB name="add" position="bottom-right" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  itemContainer: {
    flex: 1,
    padding: 12,
    paddingVertical: 10,
    borderRadius: 2,
    marginVertical: 1,
  },
  profileNameBox: {
    width: "100%",
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
});
