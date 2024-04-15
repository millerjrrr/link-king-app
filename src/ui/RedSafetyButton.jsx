import React, { useState, useRef, useEffect } from "react";
import {
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";
import colors from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import appShadow from "./../utils/appShadow";

const RedSafetyButton = ({
  setElapsedTime,
  completeFunction,
  iconName,
  size = 250,
}) => {
  const [pressStartTime, setPressStartTime] = useState(0);
  const pressTimer = useRef(null);

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
  };

  const handlePressOut = () => {
    clearTimeout(pressTimer.current);
    setPressStartTime(0);
    setElapsedTime(0);
  };

  const { colorScheme } = useSelector(getSettingsState);

  const { SECONDARY, RED } = colors[colorScheme];

  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={SECONDARY}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    ...appShadow(1),
  },
});

export default RedSafetyButton;
