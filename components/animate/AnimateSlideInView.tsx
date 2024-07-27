import React, { useRef, useEffect } from "react";
import { Animated, useWindowDimensions } from "react-native";

export enum SlidePositionProps {
  "left" = "left",
  "right" = "right",
}

export type AnimateSlideInViewProps = {
  children: React.ReactNode;
  duration?: number;
  start?: boolean;
  position?: keyof typeof SlidePositionProps;
};

export const AnimateSlideInView = ({
  children,
  duration = 800,
  start = true,
  position = SlidePositionProps.left,
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

  return position == SlidePositionProps.left ? (
    <Animated.View style={[{ left: slideAnim }, { flex: 1 }]}>
      {/* Your content here */}
      {children}
    </Animated.View>
  ) : (
    <Animated.View style={[{ right: slideAnim }, { flex: 1 }]}>
      {/* Your content here */}
      {children}
    </Animated.View>
  );
};
