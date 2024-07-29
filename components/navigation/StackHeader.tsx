import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";


export type StackHeaderProps = {
  title: string;
};

export function StackHeader({ title }: StackHeaderProps) {
  const router = useRouter();

  return (
    <ThemedView style={styles.stackScreenHeader}>
      <Ionicons
        onPress={() => router.back()}
        name="arrow-back"
        size={25}
        color={"#eee"}
      />
      <ThemedText lightColor="#eee" darkColor="#eee" type="subtitle">
        {title}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  stackScreenHeader: {
    padding: 10,
    paddingTop: 60,
    flexDirection: "row",
    right: 0,
    left: 0,
    gap: 20,
  },
});
