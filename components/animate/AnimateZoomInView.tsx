import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export type AnimateZoomInViewProps = {
  children: React.ReactNode;
  duration?: number;
  style?: any;
  start?: boolean;
  loop?: boolean;
};

export const AnimateZoomInView = ({
  children,
  duration = 800,
  style,
  start = true,
  loop = false,
}: AnimateZoomInViewProps) => {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    if (!start) {
      if (loop) {
        scaleAnim.resetAnimation();
      }
      return;
    }

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: duration, // Adjust duration as needed
      useNativeDriver: true, // For better performance
    }).start();
  }, [start, loop]);

  return (
    <Animated.View
      style={[{ transform: [{ scale: scaleAnim }] }, { flex: 1 }, style]}
    >
      {/* Your content here */}
      {children}
    </Animated.View>
  );
};
