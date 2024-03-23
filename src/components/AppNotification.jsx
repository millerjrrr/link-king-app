import { useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationState,
  updateNotification,
} from "../store/notification";
import colors from "../utils/colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getSettingsState } from "../store/settings";

const AppNotification = () => {
  const { message, type } = useSelector(
    getNotificationState,
  );

  const dispatch = useDispatch();

  const height = useSharedValue(0);
  height.value = 0;

  const heightStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const { colorScheme } = useSelector(getSettingsState);
  const color = colors[colorScheme].CONTRAST[0];
  let backgroundColor = colors[colorScheme].RED;

  switch (type) {
    case "success":
      backgroundColor = colors[colorScheme].GREEN;
      break;
    case "info":
      backgroundColor = colors[colorScheme].SECONDARY;
      break;
  }

  useEffect(() => {
    let timeOutId = 0;
    const performAnimation = () => {
      height.value = withTiming(60, { duration: 150 });

      timeOutId = setTimeout(() => {
        height.value = withTiming(0, { duration: 150 });
        dispatch(updateNotification({ message: "", type }));
      }, 3000);
    };

    if (message) performAnimation();

    return () => {
      clearTimeout(timeOutId);
    };
  }, [message]);

  return (
    <View style={styles.inlineContainer}>
      <Animated.View
        style={[
          styles.container,
          { backgroundColor },
          heightStyle,
        ]}
      >
        <Text style={[styles.text, { color }]}>
          {message}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  inlineContainer: {
    width: "100%",
    zIndex: 999,
  },
  container: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
  },
});

export default AppNotification;
