import DarkMode, { profilePic } from "./src/DarkMode";
import Examples, { examples } from "./src/Examples";
import { LoadAssets, StyleGuide, cards } from "./src/components";
import Swipe, { profiles } from "./src/Swipe";

import Decay from "./src/Decay";
import PanGesture from "./src/PanGesture";
import React from "react";
import Spring from "./src/Spring";
import { StatusBar } from "react-native";
import Timing from "./src/Timing";
import Transitions from "./src/Transitions";
import UseTransition from "./src/UseTransition";
import UseTransition2 from "./src/UseTransition2";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const assets = [
  ...examples.map(example => example.source),
  ...cards.map(card => card.source),
  ...profiles.map(profile => profile.profile),
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
      PanGesture: {
        screen: PanGesture,
        navigationOptions: {
          title: "Pan Gesture",
        },
      },
      Decay: {
        screen: Decay,
        navigationOptions: {
          title: "Decay",
        },
      },
      Spring: {
        screen: Spring,
        navigationOptions: {
          title: "Spring",
        },
      },
      Swipe: {
        screen: Swipe,
        navigationOptions: {
          title: "Swipe",
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
