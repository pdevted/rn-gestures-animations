import * as React from "react";
import {
  NavigationScreenConfigProps,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import { ScrollView, StyleSheet } from "react-native";

import { StyleGuide, Thumbnail } from "../components";

export const examples = [
  {
    screen: "UseTransition",
    title: "useTransition()",
    source: require("../../assets/examples/useTransition.png"),
  },
  {
    screen: "Transitions",
    title: "Transitions",
    source: require("../../assets/examples/transitions.png"),
  },
  {
    screen: "UseTransition2",
    title: "useTransition2()",
    source: require("../../assets/examples/useTransition.png"),
  },
  {
    screen: "DarkMode",
    title: "Dark Mode",
    source: require("../../assets/examples/dark-mode.png"),
    resizeMode: "cover" as "cover",
    dark: true,
  },
  {
    screen: "Timing",
    title: "Timing",
    source: require("../../assets/examples/timing.png"),
  },
  {
    screen: "PanGesture",
    title: "Pan Gesture",
    source: require("../../assets/examples/pan-gesture.png"),
  },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background,
  },
  content: {
    paddingBottom: 32,
  },
});

export default ({
  navigation,
}: NavigationScreenConfigProps<NavigationScreenProp<NavigationState>>) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {examples.map(thumbnail => (
        <Thumbnail
          key={thumbnail.screen}
          onPress={() => navigation.navigate(thumbnail.screen)}
          {...thumbnail}
        />
      ))}
    </ScrollView>
  );
};
