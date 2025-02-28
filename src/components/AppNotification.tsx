import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationState,
  updateNotification,
} from "@src/store/notification";
import colors from "@src/utils/colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { settingsState } from "@src/store/settings";
import AppText from "./AppText";

const AppNotification = () => {
  const { message, type } = useSelector(notificationState);

  const dispatch = useDispatch();

  const { length } = message;
  const ns = message.split("\n").length;

  const notificationHeight =
    Math.ceil(length / 24) * 30 + 30 * (ns + 1);

  const height = useSharedValue(0);

  useEffect(() => {
    height.value = 0; // ✅ Correto, agora ocorre dentro de um efeito
  }, []);

  const heightStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];
  let backgroundColor = colors[colorScheme].RED;
  let messageTime = 3000;

  switch (type) {
    case "success":
      backgroundColor = colors[colorScheme].GREEN;
      break;
    case "info":
      backgroundColor = colors[colorScheme].PRIMARY;
      messageTime = 3000;
      break;
    case "longInfo":
      backgroundColor = colors[colorScheme].PRIMARY;
      messageTime = 5000;
      break;
  }

  const timeOutIdRef = useRef<
    number | NodeJS.Timeout | null
  >(null);

  useEffect(() => {
    if (message) {
      if (process.env.NODE_ENV !== "production")
        console.log(message, "[" + type + "]");
      const performAnimation = () => {
        height.value = withTiming(notificationHeight, {
          duration: 150,
        });

        timeOutIdRef.current = setTimeout(() => {
          height.value = withTiming(0, { duration: 150 });
          dispatch(
            updateNotification({ message: "", type }),
          );
        }, messageTime);
      };

      if (message) {
        performAnimation();
      }

      return () => {
        if (timeOutIdRef.current) {
          clearTimeout(timeOutIdRef.current);
        }
      };
    }
  }, [
    message,
    messageTime,
    height,
    notificationHeight,
    type,
  ]);

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
          <AppText>{message}</AppText>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  inlineContainer: {
    width: "90%",
    zIndex: 999,
    marginHorizontal: "auto",
  },
  container: {
    position: "absolute",
    top: 60,
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
});

export default AppNotification;
