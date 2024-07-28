import { SlidePositionProps, ThemedText, ThemedView } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { createContext, useCallback, useContext, useState } from "react";
import { StyleSheet } from "react-native";

const TabNavigationContext = createContext<any>({});

export type TabScreen = {
  name: string;
  icon: {
    default: string;
    focused: string;
  };
  title: string;
  headerShown?: boolean;
  header?: (handleClick: (action: string) => void) => React.ReactNode;
};

export function TabNavigationWrapper({ children }: { children: any }) {
  //
  const TAB_SCREENS = [
    {
      name: "index",
      icon: {
        default: "home",
        focused: "home-outline",
      },
      title: "Home",
      headerShown: false,
    },
    {
      name: "violences",
      icon: {
        default: "warning",
        focused: "warning-outline",
      },
      title: "Violences",
      header: (handleClick: (action: string) => void) => (
        <ThemedView style={styles.tabScreenHeader}>
          <ThemedText type="subtitle">{"Violences"}</ThemedText>
          <ThemedView style={styles.tabHeaderIconsWrapper}>
            <ThemedText
              onPress={() => handleClick("search")}
              style={styles.tabHeaderIcon}
            >
              <Ionicons name="search" size={30} />
            </ThemedText>
            <ThemedText
              onPress={() => handleClick("add")}
              style={styles.tabHeaderIcon}
            >
              <Ionicons name="add-circle" size={30} />
            </ThemedText>
          </ThemedView>
        </ThemedView>
      ),
    },
    {
      name: "services",
      icon: {
        default: "settings",
        focused: "settings-outline",
      },
      title: "Services",
    },
    {
      name: "profile",
      icon: {
        default: "person-circle-sharp",
        focused: "person-circle-outline",
      },
      title: "Profile",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slidePosition, setSlidePosition] = useState<
    keyof typeof SlidePositionProps
  >(SlidePositionProps.left);

  const handleTabPress = useCallback(
    (target: string) => {
      const selectedIndex = TAB_SCREENS.findIndex((item) =>
        target.startsWith(item.name)
      );

      setCurrentIndex(selectedIndex);

      if (selectedIndex > currentIndex) {
        setSlidePosition(SlidePositionProps.left);
      } else {
        setSlidePosition(SlidePositionProps.right);
      }
    },
    [currentIndex, setCurrentIndex, setSlidePosition]
  );

  const TabNavigationData: TabNavigationContextDto = {
    TAB_SCREENS,
    currentIndex,
    slidePosition,
    handleTabPress,
  };

  return (
    <TabNavigationContext.Provider value={TabNavigationData}>
      <>{children}</>
    </TabNavigationContext.Provider>
  );
}

export const useTabNavigationContext = (): TabNavigationContextDto =>
  useContext(TabNavigationContext);

export type TabNavigationContextDto = {
  TAB_SCREENS: TabScreen[];
  currentIndex: number;
  slidePosition: keyof typeof SlidePositionProps;
  handleTabPress: (target: string) => void;
};

const styles = StyleSheet.create({
  tabScreenHeader: {
    padding: 10,
    paddingTop: 60,
    flexDirection: "row",
  },
  tabHeaderIconsWrapper: {
    textAlign: "right",
    position: "absolute",
    flexDirection: "row",
    right: 10,
    top: 50,
    gap: 15,
  },
  tabHeaderIcon: {
    paddingTop: 12,
  },
});
