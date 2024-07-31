import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants";
import { ResultViolenceDto } from "@/types";

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export type ViolenceListItemProps = TouchableOpacityProps & {
  item: ResultViolenceDto;
  press?: (item: ResultViolenceDto) => void;
  longPress?: (item: ResultViolenceDto) => void;
};

export function ViolenceListItem({
  item,
  press,
  longPress,
}: ViolenceListItemProps) {
  return (
    <TouchableOpacity
      style={styles.pressable}
      onLongPress={() => longPress?.(item)}
      onPress={() => press?.(item)}
    >
      <ThemedView
        lightColor="#eee"
        darkColor={Colors.secondaryDark}
        style={[styles.itemBox]}
      >
        <Image
          source={require("@/assets/images/parallax/violence.jpg")}
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
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
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
