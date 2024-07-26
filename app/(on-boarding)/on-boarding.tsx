import { AnimateZoomInView, ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants";
import { useUserStore } from "@/stores";
import { useCallback, useRef, useState } from "react";
import { Button, Image, StyleSheet, useColorScheme } from "react-native";
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
  const swiperRef = useRef<Swiper | null>(null);
  const { setOnBoardingCompleted } = useUserStore();
  const [currentIndex, setCurrenIndex] = useState<number>(0);

  const handleIndexChanged = useCallback(
    (index: number) => {
      setCurrenIndex(index);
    },
    [setCurrenIndex]
  );

  const handlePressStart = useCallback(async () => {
    setOnBoardingCompleted(true);
  }, [currentIndex, setOnBoardingCompleted]);

  const handlePressNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.scrollTo(currentIndex + 1);
  }, [swiperRef, currentIndex]);

  const handlePressPrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.scrollTo(currentIndex - 1);
  }, [swiperRef, currentIndex]);

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
          ref={swiperRef}
          showsButtons={true}
          bounces={false}
          loop={false}
          index={0}
          showsPagination={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          prevButton={
            <Button
              color={theme == "dark" ? "#fff" : "#222"}
              title="Prev"
              onPress={handlePressPrev}
            />
          }
          nextButton={
            <Button
              color={theme == "dark" ? "#fff" : "#222"}
              title="Next"
              onPress={handlePressNext}
            />
          }
          buttonWrapperStyle={{
            alignItems: "flex-end",
          }}
          onIndexChanged={handleIndexChanged}
          renderPagination={(_) => <></>}
        >
          {SLIDES.map((item, index: number) => (
            <ThemedView style={[styles.slide, dynamicStyle.slide]} key={index}>
              <AnimateZoomInView
                key={index}
                start={index === currentIndex}
                loop={true}
                duration={2000}
                style={styles.zoom}
              >
                <Image
                  source={item.image}
                  style={[styles.image, dynamicStyle.image]}
                />
              </AnimateZoomInView>
              <ThemedView style={styles.slideText}>
                <ThemedText type="subtitle" style={{ textAlign: "center" }}>
                  {item.title}
                </ThemedText>
                <ThemedText type="medium" style={{ textAlign: "center" }}>
                  {item.title}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          ))}
        </Swiper>

        {currentIndex == SLIDES.length - 1 ? (
          <ThemedText onPress={handlePressStart} style={styles.slideStartBtn}>
            Start
          </ThemedText>
        ) : (
          <ThemedText onPress={handlePressStart} style={styles.slideSkipBtn}>
            Skip
          </ThemedText>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slideText: {
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
  slideSkipBtn: {
    position: "absolute",
    right: 22,
    top: 57,
  },
  zoom: {
    position: "absolute",
    flex: 1,
  },
});
