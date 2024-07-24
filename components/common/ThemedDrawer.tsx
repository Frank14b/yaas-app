import { Image, StyleSheet } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Colors } from "@/constants";
import { ThemedView } from "./ThemedView";
import ThemedSwitch from "./ThemedSwitch";
import { ThemedText } from "./ThemedText";
import { NavigationMenuItem } from "./NavigationMenuItem";

export type ThemedDrawerProps = DrawerContentComponentProps & {
  logout: () => void;
}

export default function ThemedDrawer({ logout, ...props }: ThemedDrawerProps) {
  return (
    <ThemedView style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: Colors.primaryColor,
          marginTop: -50,
          zIndex: 10,
        }}
      >
        <Image
          alt="Not find"
          source={require("@/assets/images/on-boarding/support.avif")}
          style={styles.userAvatar}
        />
        <ThemedText
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: "800",
            marginBottom: 5,
            marginLeft: 22,
          }}
        >
          YAAS
        </ThemedText>
        <ThemedView
          style={{
            flex: 1,
            backgroundColor: Colors.primaryDark,
            paddingTop: 10,
          }}
        >
          <DrawerItemList {...props} />
        </ThemedView>
      </DrawerContentScrollView>
      <ThemedView
        style={{
          borderTopWidth: 1,
          borderTopColor: "#333",
          padding: 20,
        }}
      >
        <ThemedText lightColor="#222" style={styles.preferences}>
          Preferences
        </ThemedText>
        <ThemedView style={styles.switchTextContainer}>
          <ThemedSwitch value={true} onChange={() => {}} title="Dark Theme" />
        </ThemedView>
      </ThemedView>
      <ThemedView
        style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#333" }}
      >
        <NavigationMenuItem name="share-social-outline" title="Tell a friend" />
        <NavigationMenuItem onPress={logout} name="exit-outline" title="Sign out" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  userAvatar: {
    height: 67.5,
    width: 67.5,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 50,
    marginLeft: 20,
  },
  switchTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    marginLeft: -5,
  },
  preferences: {
    fontSize: 16,
    paddingTop: 10,
    fontWeight: "500",
  },
});
