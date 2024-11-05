import { View, StyleSheet, Pressable } from "react-native";
import AppInput from "./AppInput";
import colors from "@src/utils/colors";
import { useFormikContext } from "formik";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "./AppText";

const AuthInputField = (props) => {
  const { colorScheme } = useSelector(settingsState);
  const red = colors[colorScheme].RED;

  const inputTransformValue = useSharedValue(0);
  const {
    handleChange,
    values,
    errors,
    handleBlur,
    touched,
  } = useFormikContext();
  const {
    label,
    placeholder,
    autoCapitalize,
    keyboardType,
    secureTextEntry,
    containerStyle,
    name,
    rightIcon,
    onRightIconPress,
  } = props;

  const errorMsg =
    touched[name] && errors[name] ? errors[name] : "";

  const shakeUI = () => {
    inputTransformValue.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withSpring(0, {
        damping: 8,
        mass: 0.5,
        stiffness: 1000,
        restDisplacementThreshold: 0.1,
      }),
    );
  };

  const inputStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: inputTransformValue.value },
      ],
    };
  });

  useEffect(() => {
    if (errorMsg) shakeUI();
  }, [errorMsg]);

  return (
    <Animated.View style={[styles.container, inputStyle]}>
      <View style={styles.labelContainer}>
        <AppText style={{ fontSize: 15 }}>{label}</AppText>
        <AppText style={{ fontSize: 15, color: red }}>
          {errorMsg}
        </AppText>
      </View>
      <View>
        {/*This <View> holds both AppInput and*/}
        {/*rightIcon and is necessary*/}
        <AppInput
          {...{
            placeholder,
            keyboardType,
            autoCapitalize,
            secureTextEntry,
            style: containerStyle,
            onChangeText: handleChange(name),
            value: values[name],
            onBlur: handleBlur(name),
          }}
        />
        {rightIcon ? (
          <Pressable
            onPress={onRightIconPress}
            style={styles.rightIcon}
          >
            {rightIcon}
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  containerStyle: { width: "100%" },
  labelContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  rightIcon: {
    width: 45,
    height: 45,
    position: "absolute",
    top: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthInputField;
