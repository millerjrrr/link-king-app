import { Text, TextStyle } from "react-native";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { ReactNode } from "react";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface AppTextProps {
  style?: TextStyle;
  children: ReactNode;
  onPress?: () => void;
}

const AppText: React.FC<AppTextProps> = ({
  style,
  children,
  onPress,
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <Text
      style={{
        fontSize: base * 25,
        textAlign: "center",
        color,
        ...style,
      }}
      onPress={onPress}
      allowFontScaling={false}
    >
      {children}
    </Text>
  );
};

export default AppText;
