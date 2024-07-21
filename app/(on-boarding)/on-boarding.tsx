import { ThemedText, ThemedView } from "@/components";
import { StorageKeys } from "@/constants/Storage";
import { storage } from "@/utils/expo-storage";
import { useCallback, useState } from "react";
import { Button, Image, StyleSheet } from "react-native";
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
    image: require(`@/assets/images/on-boarding/solidarity-one.jpeg`),
    title: "Get the biggest support",
  },
];

export default function OnBoardingScreen({
  handleOnBoarding,
}: {
  handleOnBoarding: () => void;
}) {
  const [currentIndex, setCurrenIndex] = useState<number>(0);

  const handleIndexChanged = useCallback(
    (index: number) => {
      setCurrenIndex(index);
    },
    [setCurrenIndex]
  );

  const handlePressNext = useCallback(() => {
    console.log(currentIndex + 1);
  }, [currentIndex]);

  const handlePressStart = useCallback(async () => {
    if (currentIndex != SLIDES.length - 1) return;

    const rs = await storage.setItem(StorageKeys.ON_BOARDING_PASS, "1");
    if (rs) {
      handleOnBoarding();
    }
  }, [currentIndex]);

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
          nextButton={<Button title="Next" onPress={() => handlePressNext()} />}
          buttonWrapperStyle={{
            alignItems: "flex-end",
          }}
          onIndexChanged={handleIndexChanged}
        >
          {SLIDES.map((item, index: number) => (
            <ThemedView style={styles.slide} key={index}>
              <Image source={item.image} style={styles.image} />
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
    backgroundColor: "#050549",
  },
  slideTitle: {
    position: "absolute",
    bottom: 110,
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 350,
    backgroundColor: "#070d5a",
  },
  slideStartBtn: {
    position: "absolute",
    right: 17,
    bottom: 17,
  },
});
