import { View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import appShadow from "../../utils/appShadow";
import AppText from "../../ui/AppText";

const SolutionItem = ({ solution, red }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = red
    ? colors[colorScheme].RED
    : colors[colorScheme].CONTRAST[golden];
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
      <AppText
        {...{
          style: red
            ? { color: colors[colorScheme].RED }
            : null,
        }}
      >
        {solution}
      </AppText>
    </View>
  );
};

export default SolutionItem;
