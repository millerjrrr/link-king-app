import { Entypo } from "@expo/vector-icons";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const PasswordVisibilityIcon: React.FC<{
  privateIcon: boolean;
}> = ({ privateIcon }) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  return privateIcon ? (
    <Entypo name="eye" size={base * 16} color={color} />
  ) : (
    <Entypo
      name="eye-with-line"
      size={base * 16}
      color={color}
    />
  );
};

export default PasswordVisibilityIcon;
