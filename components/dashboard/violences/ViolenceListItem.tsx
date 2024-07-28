import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants";
import { ResultViolenceDto } from "@/types";
import { Image, Pressable, StyleSheet } from "react-native";

export type ViolenceListItemProps = {
  item: ResultViolenceDto;
  onPress?: (item: ResultViolenceDto) => void;
};

export function ViolenceListItem({ item, onPress }: ViolenceListItemProps) {
  return (
    <ThemedView
      lightColor="#eee"
      darkColor={Colors.secondaryDark}
      style={[styles.itemBox]}
    >
      <Image
        source={require("@/assets/images/parallax/violence.avif")}
        style={styles.itemUserPhoto}
      />
      <Pressable style={styles.pressable} onPress={() => onPress?.(item)}>
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
          {/* <ThemedText type="small" style={styles.itemType}>
            Type: {item.types.name}
          </ThemedText> */}
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
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
