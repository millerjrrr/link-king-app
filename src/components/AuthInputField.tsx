import {
  View,
  StyleSheet,
  Pressable,
  KeyboardTypeOptions,
} from "react-native";
import AppInput from "./AppInput";
import { useFormikContext } from "formik";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import AppText from "./AppText";
import useColors from "@src/hooks/useColors";

interface FormValues {
  name: string; // Define your fields explicitly if known
  email: string; // Define your fields explicitly if known
  password: string; // Define your fields explicitly if known
}

interface AuthInputFieldProps {
  label: string;
  placeholder: string;
  autoCapitalize?:
    | "none"
    | "sentences"
    | "words"
    | "characters";
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  name: keyof FormValues;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

const AuthInputField: React.FC<AuthInputFieldProps> = (
  props,
) => {
  const { RED: red } = useColors();

  const inputTransformValue = useSharedValue(0);
  const {
    handleChange,
    values,
    errors,
    handleBlur,
    touched,
  } = useFormikContext<FormValues>();
  const {
    label,
    placeholder,
    autoCapitalize,
    keyboardType,
    secureTextEntry,
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
    <Animated.View style={[{ width: "100%" }, inputStyle]}>
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
            style: { width: "100%" },
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