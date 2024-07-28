import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
import { StyleSheet } from "react-native";

export enum TabBarIconAction {
  ADD = "ADD",
  SEARCH = "SEARCH",
}

export function TabBarHeader({
  handleIconClick,
}: {
  handleIconClick: (action: keyof typeof TabBarIconAction) => void;
}) {
  return (
    <ThemedView style={styles.tabScreenHeader}>
      <ThemedText type="subtitle">{"Violences"}</ThemedText>
      <ThemedView style={styles.tabHeaderIconsWrapper}>
        <ThemedText
          onPress={() => handleIconClick(TabBarIconAction.SEARCH)}
          style={styles.tabHeaderIcon}
        >
          <Ionicons name="search" size={30} />
        </ThemedText>
        <ThemedText
          onPress={() => handleIconClick(TabBarIconAction.ADD)}
          style={styles.tabHeaderIcon}
        >
          <Ionicons name="add-circle" size={30} />
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabScreenHeader: {
    padding: 10,
    paddingTop: 60,
    flexDirection: "row",
  },
  tabHeaderIconsWrapper: {
    textAlign: "right",
    position: "absolute",
    flexDirection: "row",
    right: 10,
    top: 50,
    gap: 15,
  },
  tabHeaderIcon: {
    paddingTop: 12,
  },
});
