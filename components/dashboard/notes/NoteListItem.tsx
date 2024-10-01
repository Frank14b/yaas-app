import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants";
import { ResultNoteDto } from "@/types";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export type NoteListItemProps = TouchableOpacityProps & {
  item: ResultNoteDto;
  press?: (item: ResultNoteDto) => void;
  longPress?: (item: ResultNoteDto) => void;
};

export function NoteListItem({ item, press, longPress }: NoteListItemProps) {
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
        <ThemedView style={{ backgroundColor: "transparent", flex: 1 }}>
          <ThemedText style={styles.itemUserName}>
            {item?.users?.firstname} {item?.users?.lastname}
          </ThemedText>
          <ThemedText type="medium" darkColor={Colors.primaryColor}>
            {item.name}
          </ThemedText>
          <ThemedText>{item.details}</ThemedText>
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
