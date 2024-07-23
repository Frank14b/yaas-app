import { StyleSheet, Switch, SwitchProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants";

type ThemedSwitchProps = SwitchProps & {
  title: string;
};

export default function ThemedSwitch({ title, ...rest }: ThemedSwitchProps) {
  return (
    <>
      <Switch
        trackColor={{ false: "#767577", true: Colors.primaryColor }}
        thumbColor="#f4f3f4"
        style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
        {...rest}
      />
      <ThemedText lightColor="#222" darkColor="#fff" style={[styles.title]}>
        {title}
      </ThemedText>
    </>
  );
}

const styles = StyleSheet.create({
  switch: {},
  title: {
    fontSize: 15,
    marginLeft: 5,
  },
});
