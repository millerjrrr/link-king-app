import { TextInputProps } from "react-native";
import appShadow from "@src/utils/appShadow";
import useColors from "@src/hooks/utilityHooks/useColors";
import ClosingTextInput from "./ClosingTextInput";

//This may be used in some settings tabs in the future
const AppInput: React.FC<TextInputProps> = (props) => {
  const {
    CONTRAST: color,
    PRIMARY: backgroundColor,
    STATUSBAR,
    INACTIVE_CONTRAST,
  } = useColors();

  const keyboardAppearance =
    STATUSBAR.split("-")[0] === "dark" ? "light" : "dark";

  return (
    <ClosingTextInput
      {...props}
      placeholderTextColor={INACTIVE_CONTRAST}
      autoComplete="off"
      selectionColor={color}
      autoCorrect={false}
      textContentType="none"
      allowFontScaling={false}
      underlineColorAndroid="transparent"
      keyboardAppearance={keyboardAppearance}
      style={[
        props.style,
        {
          height: 45,
          borderRadius: 15,
          fontSize: 20,
          padding: 10,
          backgroundColor,
          color,
          ...appShadow(color),
        },
      ]}
    />
  );
};

export default AppInput;
