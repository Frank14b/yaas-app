import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export type AnimateFadeInViewProps = {
  children: React.ReactNode;
  duration?: number;
  style?: any;
  start?: boolean;
  loop?: boolean;
};

export const AnimateFadeInView = ({
  children,
  duration = 800,
  style,
  start = true,
  loop = false,
}: AnimateFadeInViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!start) {
      if (loop) {
        fadeAnim.resetAnimation();
      }
      return;
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration, // Adjust duration as needed
      useNativeDriver: true, // For better performance
    }).start();
  }, [start, loop]);

  return (
    <Animated.View style={[{ opacity: fadeAnim }, { flex: 1 }, style]}>
      {/* Your content here */}
      {children}
    </Animated.View>
  );
};
