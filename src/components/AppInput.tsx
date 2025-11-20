import { TextInputProps } from "react-native";
import appShadow from "@src/utils/appShadow";
import useColors from "@src/hooks/utilityHooks/useColors";
import ClosingTextInput from "./ClosingTextInput";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

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
          height: base * 45,
          borderRadius: base * 15,
          fontSize: base * 20,
          padding: base * 10,
          backgroundColor,
          color,
          ...appShadow(color, base * 10),
        },
      ]}
    />
  );
};

export default AppInput;
