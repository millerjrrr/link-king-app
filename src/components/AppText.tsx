import { Text, TextStyle } from "react-native";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { ReactNode } from "react";

interface AppTextProps {
  style?: TextStyle;
  children: ReactNode;
}

const AppText: React.FC<AppTextProps> = ({
  style,
  children,
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <Text
      style={{
        fontSize: 25,
        textAlign: "center",
        color,
        ...style,
      }}
      allowFontScaling={false}
    >
      {children}
    </Text>
  );
};

export default AppText;
