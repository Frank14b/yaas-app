import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";

export default function ThemedDrawer({ ...props }: any) {
  return (
    <View style={{ flex: 1 }}>
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
        <Text
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: "800",
            marginBottom: 5,
            marginLeft: 22,
          }}
        >
          YAAS
        </Text>
        <View style={{ flex: 1, backgroundColor: Colors.secondaryDark, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#333",
        }}
      >
        <Text style={styles.preferences}>Preferences</Text>
        <View style={styles.switchTextContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor="#f4f3f4"
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
          />
          <Text
            style={{
              fontSize: 15,
              color: "#fff",
            }}
          >
            Dark Theme
          </Text>
        </View>
      </View>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#333" }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} style={{color: "#fff"}} />
            <Text
              style={{
                fontSize: 15,
                color: "#fff",
                marginLeft: 5,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} style={{color: "#fff"}} />
            <Text
              style={{
                fontSize: 15,
                color: "#fff",
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
    marginLeft: 7,
    paddingVertical: 5,
  },
  preferences: {
    fontSize: 16,
    color: "#fff",
    paddingTop: 10,
    fontWeight: "500",
    paddingLeft: 20,
  },
  switchText: {
    fontSize: 17,
    color: "",
    paddingTop: 10,
    fontWeight: "bold",
  },
});
