import * as React from "react";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import { min, onGestureEvent } from "react-native-redash";

import Animated from "react-native-reanimated";
import { StyleSheet } from "react-native";

const {
  useCode,
  Clock,
  Value,
  cond,
  set,
  eq,
  add,
  spring,
  clockRunning,
  startClock,
  stopClock,
  block,
  and,
  not,
  neq,
  multiply,
  sub,
  abs,
  call,
} = Animated;

interface WithSpringProps {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Adaptable<State>;
  snapPoints: number[];
  offset?: Animated.Value<number>;
  config?: Animated.SpringConfig;
  onSnap?: (args: readonly number[]) => void;
}

const snapPoint: (
  snapPoints: number[],
  value: Animated.Adaptable<number>, // current point
  velocity: Animated.Adaptable<number> // point per a second
) => number = (
  snapPoints: number[],
  value: Animated.Adaptable<number>, // current point
  velocity: Animated.Adaptable<number> // point per a second
) => {
  const point = add(value, multiply(velocity, 0.2));
  const deltas = snapPoints.map(p => abs(sub(point, p)));
  const minDelta = min(...deltas);
  return snapPoints.reduce((acc, p) =>
    cond(eq(abs(sub(point, p)), minDelta), p, acc)
  );
};

const withSpring = (props: WithSpringProps) => {
  const { value, velocity, state, snapPoints, offset, config, onSnap } = {
    offset: new Value(0),
    config: {
      toValue: new Value(0),
      damping: 20,
      mass: 1,
      stiffness: 150,
      overshootClamping: false,
      restSpeedThreshold: 1,
      restDisplacementThreshold: 1,
    },
    ...props,
  };
  const clock = new Clock();
  const springState: Animated.SpringState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const AreGestureAndAnimationFinished = new Value(1); // true
  const isSpringInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishSpring = [set(offset, springState.position), stopClock(clock)];

  return block([
    cond(isSpringInterrupted, finishSpring),
    cond(AreGestureAndAnimationFinished, set(springState.position, offset)),
    cond(neq(state, State.END), [
      set(AreGestureAndAnimationFinished, 0),
      set(springState.finished, 0),
      set(springState.position, add(offset, value)),
    ]),
    cond(and(eq(state, State.END), not(AreGestureAndAnimationFinished)), [
      cond(and(not(clockRunning(clock)), not(springState.finished)), [
        set(springState.velocity, velocity),
        set(springState.time, 0),
        set(config.toValue, snapPoint(snapPoints, value, velocity)),
        startClock(clock),
      ]),
      spring(clock, springState, config),
      cond(springState.finished, [
        set(AreGestureAndAnimationFinished, 1),
        onSnap && call([springState.position], onSnap),
        ...finishSpring,
      ]),
    ]),
    springState.position,
  ]);
};

interface SwipeableProps {
  translateX: Animated.Value<number>;
  translateY: Animated.Value<number>;
  snapPoints: number[];
  onSnap?: (args: readonly number[]) => void;
  offsetX: Animated.Value<number>;
}

export default ({
  translateX,
  translateY,
  snapPoints,
  onSnap,
  offsetX,
}: SwipeableProps) => {
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);

  const gestureHandler = onGestureEvent({
    translationX,
    translationY,
    velocityX,
    velocityY,
    state,
  });
  const x = withSpring({
    value: translationX,
    velocity: velocityX,
    state,
    snapPoints,
    onSnap,
    offset: offsetX,
  });
  const y = withSpring({
    value: translationY,
    velocity: velocityY,
    state,
    snapPoints: [0],
  });

  useCode(() => block([set(translateX, x), set(translateY, y)]), []);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill}></Animated.View>
    </PanGestureHandler>
  );
};
