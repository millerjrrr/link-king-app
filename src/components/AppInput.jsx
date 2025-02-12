import { TextInput } from "react-native";
import appShadow from "@src/utils/appShadow";
import useColors from "@src/hooks/useColors";

//This may be used in some settings tabs in the future
const AppInput = (props) => {
  const {
    CONTRAST: color,
    PRIMARY: backgroundColor,
    STATUSBAR,
    INACTIVE_CONTRAST,
  } = useColors();

  const keyboardAppearance =
    STATUSBAR.split("-")[0] === "dark" ? "light" : "dark";

  return (
    <TextInput
      {...props}
      autoCompleteType="off"
      selectionColor={color}
      autoCorrect={false}
      textContentType="none"
      allowFontScaling={false}
      underlineColorAndroid="transparent"
      placeholderTextColor={INACTIVE_CONTRAST}
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
