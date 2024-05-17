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

  const { length } = message;
  const notificationHeight =
    Math.ceil(length / 24) * 30 + 30;

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
  let messageTime = 3000;

  switch (type) {
    case "success":
      backgroundColor = colors[colorScheme].GREEN;
      break;
    case "info":
      backgroundColor = colors[colorScheme].PRIMARY;
      messageTime = 2000;
      break;
  }

  useEffect(() => {
    let timeOutId = 0;
    const performAnimation = () => {
      height.value = withTiming(notificationHeight, {
        duration: 150,
      });

      timeOutId = setTimeout(() => {
        height.value = withTiming(0, { duration: 150 });
        dispatch(updateNotification({ message: "", type }));
      }, messageTime);
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
          { backgroundColor: color },
          heightStyle,
        ]}
      >
        <View style={[styles.border, { backgroundColor }]}>
          <Text style={[styles.text, { color }]}>
            {message}
          </Text>
        </View>
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
    borderRadius: 7,
  },
  border: {
    flex: 1,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  text: {
    fontSize: 25,
    textAlign: "center",
  },
});

export default AppNotification;
