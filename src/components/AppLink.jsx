import { TouchableOpacity } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "./AppText";

const AppLink = ({ title, onPress }) => {
  const { colorScheme } = useSelector(settingsState);
  const color = colors[colorScheme].INACTIVE_CONTRAST;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ padding: 5, paddingTop: 10 }}
    >
      <AppText style={{ color, fontSize: 15 }}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppLink;
