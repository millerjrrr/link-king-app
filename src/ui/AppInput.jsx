import { TextInput } from "react-native";
import colors from "../utils/colors";
import appShadow from "../utils/appShadow";
import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";

//This may be used in some settings tabs in the future
const AppInput = (props) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].PRIMARY;

  return (
    <TextInput
      {...props}
      autoCompleteType="off"
      autoCorrect={false}
      textContentType="none"
      placeholderTextColor={
        colors[colorScheme].INACTIVE_CONTRAST
      }
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
