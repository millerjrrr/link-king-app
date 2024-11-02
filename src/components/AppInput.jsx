import { TextInput } from "react-native";
import colors from "@src/utils/colors";
import appShadow from "@src/utils/appShadow";
import { useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";

//This may be used in some settings tabs in the future
const AppInput = (props) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].PRIMARY;

  const keyboardAppearance =
    colors[colorScheme].STATUSBAR.split("-")[0] === "dark"
      ? "light"
      : "dark";

  return (
    <TextInput
      {...props}
      autoCompleteType="off"
      autoCorrect={false}
      textContentType="none"
      allowFontScaling={false}
      underlineColorAndroid="transparent"
      placeholderTextColor={
        colors[colorScheme].INACTIVE_CONTRAST
      }
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
          shadowColor: color,
          borderColor: color,
          ...appShadow(1),
        },
      ]}
    />
  );
};

export default AppInput;
