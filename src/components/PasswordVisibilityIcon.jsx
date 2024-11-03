import { Entypo } from "@expo/vector-icons";
import colors from "@assets/themes/colors";
import { useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";

const PasswordVisibilityIcon = ({ privateIcon }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  return privateIcon ? (
    <Entypo {...{ name: "eye", size: 16, color }} />
  ) : (
    <Entypo
      {...{ name: "eye-with-line", size: 16, color }}
    />
  );
};

export default PasswordVisibilityIcon;
