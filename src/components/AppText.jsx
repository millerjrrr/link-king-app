import { Text } from "react-native";
import { useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import colors from "@assets/themes/colors";

const AppText = ({ style, children }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <Text
      {...{
        style: {
          fontSize: 25,
          textAlign: "center",
          color,
          ...style,
        },
        allowFontScaling: false,
      }}
    >
      {children}
    </Text>
  );
};

export default AppText;
