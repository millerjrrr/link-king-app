import { Entypo } from "@expo/vector-icons";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";

const PasswordVisibilityIcon = ({ privateIcon }) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
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
