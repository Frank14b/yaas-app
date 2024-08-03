import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants";
import { ResultServiceDto } from "@/types";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export type ServiceListItemProps = TouchableOpacityProps & {
  item: ResultServiceDto;
  press?: (item: ResultServiceDto) => void;
  longPress?: (item: ResultServiceDto) => void;
};

export function ServiceListItem({
  item,
  press,
  longPress,
}: ServiceListItemProps) {
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
          source={require("@/assets/images/parallax/services.webp")}
          style={styles.itemUserPhoto}
        />
        <ThemedView style={{ backgroundColor: "transparent", flex: 1 }}>
          <ThemedText style={styles.itemUserName}>
            {item.user.firstname} {item.user.lastname}
          </ThemedText>
          <ThemedText>{item.type.name}</ThemedText>
          <ThemedText type="small">
            {item.ref} | {new Date(`${item.created_at}`).toDateString()}
          </ThemedText>
          <ThemedText type="small" style={styles.itemFlag}>
            {item.country}
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
