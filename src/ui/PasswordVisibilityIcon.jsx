import { Entypo } from "@expo/vector-icons";
import colors from "../utils/colors";

const PasswordVisibilityIcon = ({ privateIcon }) => {
  return privateIcon ? (
    <Entypo
      name="eye"
      size={16}
      color={colors.dark.CONTRAST[0]}
    />
  ) : (
    <Entypo
      name="eye-with-line"
      size={16}
      color={colors.dark.CONTRAST[0]}
    />
  );
};

export default PasswordVisibilityIcon;
