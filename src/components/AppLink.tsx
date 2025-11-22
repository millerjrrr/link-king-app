import { TouchableOpacity } from "react-native";
import AppText from "./AppText";
import useColors from "@src/hooks/utilityHooks/useColors";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const AppLink: React.FC<{
  title: string;
  onPress: () => void;
}> = ({ title, onPress }) => {
  const { INACTIVE_CONTRAST } = useColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ padding: base * 5, paddingTop: base * 10 }}
    >
      <AppText
        style={{
          color: INACTIVE_CONTRAST,
          fontSize: base * 15,
        }}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppLink;
