import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import AppInput from "../../ui/AppInput";
import colors from "../../utils/colors";
import { useFormikContext } from "formik";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";

const AuthInputField = (props) => {
  const inputTransformValue = useSharedValue(0);
  const {
    handleSubmit,
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
      withTiming(-10, { durationg: 50 }),
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
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.errorMsg}>{errorMsg}</Text>
      </View>
      <View>
        {/*This <View> holds both AppInput and*/}
        {/*rightIcon and is necessary*/}
        <AppInput
          {...{
            onSubmitEditing: handleSubmit,
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
  label: {
    color: colors.CONTRAST[0],
  },
  errorMsg: {
    color: colors.ERROR,
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
