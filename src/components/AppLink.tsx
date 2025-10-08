import { TouchableOpacity } from "react-native";
import AppText from "./AppText";
import useColors from "@src/hooks/utilityHooks/useColors";

const AppLink: React.FC<{
  title: string;
  onPress: () => void;
}> = ({ title, onPress }) => {
  const { INACTIVE_CONTRAST } = useColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ padding: 5, paddingTop: 10 }}
    >
      <AppText
        style={{ color: INACTIVE_CONTRAST, fontSize: 15 }}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppLink;
