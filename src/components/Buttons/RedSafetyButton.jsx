import React, { useRef, useEffect } from "react";
import { TouchableHighlight, View } from "react-native";
import colors from "@src/utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appShadow from "@src/utils/appShadow";
import { updateNotification } from "@src/store/notification";
import appTextSource from "@src/utils/appTextSource";
import {
  redCoverState,
  updateRedCover,
} from "@src/store/redCover";
import { useNavigation } from "@react-navigation/native";

const RedSafetyButton = ({
  completeFunction,
  iconName = "delete",
  size = 60,
}) => {
  const pressTimer = useRef(null);
  const { colorScheme, appLang } =
    useSelector(settingsState);
  const { SECONDARY, RED } = colors[colorScheme];
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { startTime } = useSelector(redCoverState);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "blur",
      () => {
        dispatch(updateRedCover({ elapsedTime: 0 }));
      },
    );
    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (startTime !== 0) {
        dispatch(
          updateRedCover({
            elapsedTime: (Date.now() - startTime) / 1000,
          }),
        );
      }
    }, 100);

    return () => clearInterval(timerInterval);
  }, [startTime]);

  const handlePressIn = () => {
    pressTimer.current = setTimeout(() => {
      completeFunction();
      dispatch(
        updateRedCover({
          elapsedTime: 0,
          startTime: 0,
          redCoverZIndex: 1,
        }),
      );
    }, 3100); //needs a little longer to ensure screen fills
    dispatch(
      updateRedCover({
        startTime: Date.now(),
        redCoverZIndex: 5,
      }),
    );
  };

  const handlePressOut = () => {
    clearTimeout(pressTimer.current);
    dispatch(
      updateRedCover({
        startTime: 0,
        redCoverZIndex: 1,
        elapsedTime: 0,
      }),
    );
  };

  const { pressAndHold: message } =
    appTextSource(appLang).options;

  const onPress = () => {
    if ((Date.now() - startTime) / 1000 < 1)
      dispatch(
        updateNotification({
          message,
          type: "fail",
        }),
      );
  };

  return (
    <View style={{ zIndex: 10 }}>
      <TouchableHighlight
        underlayColor={SECONDARY}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          backgroundColor: SECONDARY,
          shadowColor: RED,
          borderColor: RED,
          height: size,
          width: size,
          margin: size / 5,
          borderRadius: size / 2,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          ...appShadow(1),
        }}
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

export default RedSafetyButton;
