import { modalState } from "@src/store/modals";
import { ReactNode, useEffect } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { Modal as ModalType } from "@src/types/Modals";

interface SwiperWrapperProps {
  name: ModalType;
  children: ReactNode;
  closeFunction: () => void;
  swipeLeftFunction?: () => void;
  swipeRightFunction?: () => void;
}

const scrollGesture = Gesture.Native();

const SwiperWrapper = ({
  name,
  children,
  closeFunction,
  swipeLeftFunction = closeFunction,
  swipeRightFunction = closeFunction,
}: SwiperWrapperProps) => {
  //gesture handling logic
  const pivotHeight = -1000; // adjust based on modal size
  const { modalShowing, showNewWordAddedModal } =
    useSelector(modalState);

  useEffect(() => {
    if (name === modalShowing) {
      rotation.value = 0; // instant reset when modal opens
    }
    if (showNewWordAddedModal === true) {
      rotation.value = 0;
    }
  }, [modalShowing, showNewWordAddedModal]);

  const rotation = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const maxRotation = -25;
      const ratio = event.translationX / -200;
      rotation.value = ratio * maxRotation;
    })
    .onEnd(() => {
      if (rotation.value < -10) {
        runOnJS(swipeLeftFunction)();
      } else if (rotation.value > 10) {
        runOnJS(swipeRightFunction)();
      } else {
        rotation.value = withTiming(0);
      }
    })
    .simultaneousWithExternalGesture(scrollGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: -pivotHeight },
      { rotateZ: `${rotation.value}deg` },
      { translateY: pivotHeight },
    ],
  }));

  return (
    <GestureHandlerRootView
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[{ width: "100%" }, animatedStyle]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default SwiperWrapper;
