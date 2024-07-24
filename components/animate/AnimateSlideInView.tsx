import React, { useRef, useEffect } from "react";
import { Animated, useWindowDimensions } from "react-native";

export type AnimateSlideInViewProps = {
  children: React.ReactNode;
  duration?: number;
};

export const AnimateSlideInView = ({
  children,
  duration = 800,
}: AnimateSlideInViewProps) => {
  const { width, height } = useWindowDimensions();

  const slideAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: duration, // Adjust duration as needed
      useNativeDriver: false, // For better performance
    }).start();
  }, []);

  return (
    <Animated.View style={[{ left: slideAnim }, { flex: 1 }]}>
      {/* Your content here */}
      {children}
    </Animated.View>
  );
};
