import React, { useState, useRef, useEffect } from "react";
import {
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";
import colors from "../../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import appShadow from "../../utils/appShadow";
import { updateNotification } from "../../store/notification";
import appTextSource from "../../utils/appTextSource";

const RedSafetyButton = ({
  setElapsedTime,
  completeFunction,
  iconName,
  size = 60,
  setCoverZIndex,
}) => {
  const [pressStartTime, setPressStartTime] = useState(0);
  const pressTimer = useRef(null);
  const { colorScheme, appLang } = useSelector(
    getSettingsState,
  );
  const { SECONDARY, RED } = colors[colorScheme];

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (pressStartTime !== 0) {
        const elapsedTime =
          (Date.now() - pressStartTime) / 1000; // Convert to seconds
        setElapsedTime(elapsedTime);
      }
    }, 100); // Update every second

    return () => clearInterval(timerInterval);
  }, [pressStartTime]);

  const handlePressIn = () => {
    pressTimer.current = setTimeout(() => {
      completeFunction();
    }, 3100); //needs a little longer to ensure screen fills
    setPressStartTime(Date.now());
    setCoverZIndex(5);
  };

  const handlePressOut = () => {
    clearTimeout(pressTimer.current);
    setPressStartTime(0);
    setElapsedTime(0);
    setCoverZIndex(1);
  };

  const dispatch = useDispatch();
  const { pressAndHold: message } =
    appTextSource(appLang).options;

  const onPress = () => {
    if ((Date.now() - pressStartTime) / 1000 < 1)
      dispatch(
        updateNotification({
          message,
          type: "fail",
        }),
      );
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={SECONDARY}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.buttonContainer,
          {
            backgroundColor: SECONDARY,
            shadowColor: RED,
            borderColor: RED,
            height: size,
            width: size,
            margin: size / 5,
            borderRadius: size / 2,
          },
        ]}
      >
        <AntDesign
          {...{
            name: iconName,
            size: size / 2,
            color: RED,
          }}
        />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...appShadow(1),
  },
});

export default RedSafetyButton;
