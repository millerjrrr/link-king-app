import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import appShadow from "./../../utils/appShadow";

const SolutionItem = ({ solution }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].SECONDARY;
  return (
    <View
      style={{
        backgroundColor,
        marginHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 20,
        shadowColor: color,
        borderColor: color,
        height: 40,
        ...appShadow(1),
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color,
          fontSize: 25,
        }}
      >
        {solution}
      </Text>
    </View>
  );
};

export default SolutionItem;
