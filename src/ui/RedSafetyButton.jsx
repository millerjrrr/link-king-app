import React, { useState, useRef, useEffect } from "react";
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import colors from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";

const RedSafetyButton = ({
  setElapsedTime,
  completeFunction,
  iconName,
  size = 300,
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

  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={colors.SECONDARY}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.buttonContainer,
          {
            height: size,
            width: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <AntDesign
          name={iconName}
          size={size / 2}
          color={colors.RED}
        />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.RED,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 10,
  },
  buttonContainer: {
    backgroundColor: colors.SECONDARY,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.RED,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default RedSafetyButton;
