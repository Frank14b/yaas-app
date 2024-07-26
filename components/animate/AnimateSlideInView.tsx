import React, { useRef, useEffect } from "react";
import { Animated, useWindowDimensions } from "react-native";

export type AnimateSlideInViewProps = {
  children: React.ReactNode;
  duration?: number;
  start?: boolean;
};

export const AnimateSlideInView = ({
  children,
  duration = 800,
  start = true,
}: AnimateSlideInViewProps) => {
  const { width } = useWindowDimensions();

  const slideAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    if (!start) return;

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: duration, // Adjust duration as needed
      useNativeDriver: false, // For better performance
    }).start();
  }, [start]);

  return (
    <Animated.View style={[{ left: slideAnim }, { flex: 1 }]}>
      {/* Your content here */}
      {children}
    </Animated.View>
  );
};
