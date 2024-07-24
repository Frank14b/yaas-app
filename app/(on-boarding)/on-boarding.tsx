import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants";
import { useUserStore } from "@/stores";
import { useCallback, useState } from "react";
import { Image, StyleSheet, useColorScheme } from "react-native";
import Swiper from "react-native-swiper";

const SLIDES = [
  {
    key: 1,
    image: require(`@/assets/images/on-boarding/Team-spirit-bro.png`),
    title: "Welcome to YAAS",
  },
  {
    key: 2,
    image: require(`@/assets/images/on-boarding/solidarity-one.jpeg`),
    title: "Record all incidents",
  },
  {
    key: 3,
    image: require(`@/assets/images/on-boarding/support.avif`),
    title: "Give the biggest support",
  },
];

export default function OnBoardingScreen() {
  //
  const theme = useColorScheme();
  //
  const { setOnBoardingCompleted } = useUserStore();

  const [currentIndex, setCurrenIndex] = useState<number>(0);

  const handleIndexChanged = useCallback(
    (index: number) => {
      setCurrenIndex(index);
    },
    [setCurrenIndex]
  );

  const handlePressStart = useCallback(async () => {
    if (currentIndex != SLIDES.length - 1) return;

    setOnBoardingCompleted(true);
  }, [currentIndex, setOnBoardingCompleted]);

  const dynamicStyle = {
    slide: {
      backgroundColor: theme == "dark" ? Colors.primaryDark : "",
    },
    image: {
      backgroundColor: theme == "dark" ? Colors.secondaryDark : "#f5f5f5",
    },
  };

  return (
    <>
      <ThemedView style={styles.container}>
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          bounces={false}
          loop={false}
          index={0}
          showsPagination={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // nextButton={<Button title="Next" onPress={() => handlePressNext()} />}
          buttonWrapperStyle={{
            alignItems: "flex-end",
          }}
          onIndexChanged={handleIndexChanged}
        >
          {SLIDES.map((item, index: number) => (
            <ThemedView style={[styles.slide, dynamicStyle.slide]} key={index}>
              <Image
                source={item.image}
                style={[styles.image, dynamicStyle.image]}
              />
              <ThemedText type="subtitle" style={styles.slideTitle}>
                {item.title}
              </ThemedText>

              {currentIndex == SLIDES.length - 1 && (
                <ThemedText
                  onPress={handlePressStart}
                  style={styles.slideStartBtn}
                >
                  Start
                </ThemedText>
              )}
            </ThemedView>
          ))}
        </Swiper>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slideTitle: {
    position: "absolute",
    bottom: 110,
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 350,
  },
  slideStartBtn: {
    position: "absolute",
    right: 17,
    bottom: 17,
  },
});
