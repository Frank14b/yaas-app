/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primaryColor = '#FFA600';
const primaryDark = '#151718';
const secondaryDark = '#3A3B3C';
const tertiaryDark = '#3A3B3D';
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  primaryColor,
  tintColorLight,
  tintColorDark,
  primaryDark,
  secondaryDark,
  tertiaryDark,
  
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
