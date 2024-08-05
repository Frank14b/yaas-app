import { Dimensions, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export type ThemedNoDataFound = {
  text: string;
};

export function ThemedNoDataFound({ text }: ThemedNoDataFound) {
  return (
    <>
      <ThemedView style={styles.wrapper}>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.text}>{text}</ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: Dimensions.get("screen").height - 300,
    justifyContent:"center"
  },
  container: {
    
  },
  text: {
    textAlign: "center",
  },
});
