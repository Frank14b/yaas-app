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
import { useTranslation } from "react-i18next";

export type ThemedDrawerProps = DrawerContentComponentProps & {
  isDark: boolean;
  logout: () => void;
};

export default function ThemedDrawer({
  isDark,
  logout,
  ...props
}: ThemedDrawerProps) {

  const { t } = useTranslation();

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
          source={require("@/assets/images/on-boarding/Team-spirit-bro.png")}
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
            backgroundColor: isDark ? Colors.primaryDark : "#fff",
            paddingTop: 10,
          }}
        >
          <DrawerItemList {...props} />
        </ThemedView>
      </DrawerContentScrollView>
      <ThemedView
        style={{
          borderTopWidth: 1,
          borderTopColor: isDark ? "#333" : "#eee",
          padding: 20,
        }}
      >
        <ThemedText lightColor="#222" style={styles.preferences}>
          {t("navigation.preferences")}
        </ThemedText>
        <ThemedView style={styles.switchTextContainer}>
          <ThemedSwitch disabled={true} value={isDark} onChange={() => {}} title={t("navigation.dark_theme")} />
        </ThemedView>
      </ThemedView>
      <ThemedView
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: isDark ? "#333" : "#eee",
        }}
      >
        <NavigationMenuItem name="share-social-outline" title={t("navigation.tell_a_friend")} />
        <NavigationMenuItem
          onPress={logout}
          name="exit-outline"
          title={t("navigation.signOut")}
        />
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
    backgroundColor: "#fff"
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
