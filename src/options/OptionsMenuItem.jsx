import { Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import colors from "../utils/colors";
import { getSettingsState } from "../store/settings";
import OptionsMenuItemContainer from "./components/OptionsMenuItemContainer";

const OptionsMenuItem = ({
  iconName,
  first,
  text,
  onPress,
}) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <OptionsMenuItemContainer {...{ first, iconName }}>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center" }}
        onPress={onPress}
      >
        <Text
          style={{
            color,
            fontSize: 20,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </OptionsMenuItemContainer>
  );
};

export default OptionsMenuItem;
