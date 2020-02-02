import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { LoadAssets, StyleGuide, cards } from "./src/components";
import Examples, { examples } from "./src/Examples";
import DarkMode, { profilePic } from "./src/DarkMode";
import UseTransition from "./src/UseTransition";
import UseTransition2 from "./src/UseTransition2";
import Transitions from "./src/Transitions";
import Timing from "./src/Timing";

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const assets = [
  ...examples.map(example => example.source),
  ...cards.map(card => card.source),
  profilePic,
];

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Examples: {
        screen: Examples,
        navigationOptions: {
          title: "Gestures & Animations",
          headerBackTitle: undefined,
        },
      },
      UseTransition: {
        screen: UseTransition,
        navigationOptions: {
          title: "useTransition()",
        },
      },
      Transitions: {
        screen: Transitions,
        navigationOptions: {
          title: "Transitions",
        },
      },
      UseTransition2: {
        screen: UseTransition2,
        navigationOptions: {
          title: "UseTransition2()",
        },
      },
      DarkMode: {
        screen: DarkMode,
        navigationOptions: {
          title: "Dark Mode",
        },
      },
      Timing: {
        screen: Timing,
        navigationOptions: {
          title: "Timing",
        },
      },
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: StyleGuide.palette.primary,
          borderBottomWidth: 0,
        },
        headerTintColor: "white",
      },
    }
  )
);

export default () => (
  <LoadAssets {...{ fonts, assets }}>
    <StatusBar barStyle="light-content" />
    <AppNavigator />
  </LoadAssets>
);
