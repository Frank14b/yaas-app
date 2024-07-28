import { Image, StyleSheet } from "react-native";

import { AnimateSlideInView, ThemedText, ThemedView } from "@/components";
import { useTabNavigationContext } from "@/contexts";
import { useUserStore } from "@/stores";

export default function ProfileScreen() {
  //
  const { slidePosition } = useTabNavigationContext();

  const { user } = useUserStore();

  return (
    <AnimateSlideInView duration={200} position={slidePosition}>
      <ThemedView style={styles.container}>
        <ThemedView lightColor="#fff" style={[styles.profileNameBox]}>
          <Image
            source={require("@/assets/images/parallax/services.webp")}
            style={styles.itemUserPhoto}
          />
          <ThemedView style={{ backgroundColor: "transparent", flex: 1 }}>
            <ThemedText style={styles.itemUserName}>
              {user?.firstname} {user?.lastname}
            </ThemedText>
            <ThemedText>{user?.email}</ThemedText>
            <ThemedText>{user?.username}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView
          lightColor="#eee"
          darkColor="#222"
          style={styles.profileDetails}
        >
          <ThemedText style={styles.detailsLine}>
            {user?.country} {user?.city}
          </ThemedText>

          <ThemedText style={styles.detailsLine}>
            {new Date(`${user?.created_at}`).toDateString()}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </AnimateSlideInView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 8,
    paddingTop: 100,
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
  profileDetails: {
    flex: 1,
    padding: 10,
  },
  detailsLine: {
    paddingVertical: 12,
  },
});
