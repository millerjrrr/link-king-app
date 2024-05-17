import { Entypo } from "@expo/vector-icons";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";

const PasswordVisibilityIcon = ({ privateIcon }) => {
  const { colorScheme } = useSelector(getSettingsState);
  const color = colors[colorScheme].CONTRAST[0];

  return privateIcon ? (
    <Entypo {...{ name: "eye", size: 16, color }} />
  ) : (
    <Entypo
      {...{ name: "eye-with-line", size: 16, color }}
    />
  );
};

export default PasswordVisibilityIcon;
