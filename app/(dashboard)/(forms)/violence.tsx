import { AnimateSlideInView, ThemedView } from "@/components";
import { ViolenceForm } from "@/components/dashboard";
import { SafeAreaView, StyleSheet } from "react-native";

export default function ViolenceFormScreen() {
  return (
    <AnimateSlideInView duration={200} start={true} position={"left"}>
      {/* <SafeAreaView style={styles.wrapper}> */}
        <ThemedView style={styles.container}>
          <ViolenceForm />
        </ThemedView>
      {/* </SafeAreaView> */}
    </AnimateSlideInView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
