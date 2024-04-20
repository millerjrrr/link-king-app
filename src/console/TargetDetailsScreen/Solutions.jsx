import {
  Text,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import appShadow from "./../../utils/appShadow";

const Solution = ({ solution, index }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].SECONDARY;
  return (
    <View
      style={{
        backgroundColor,
        marginHorizontal: 8,
        justifyContent: "center",
        paddingHorizontal: 10,
        borderRadius: 20,
        shadowColor: color,
        borderColor: color,
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

const Solutions = () => {
  const {
    attempt: { solutions },
  } = useSelector(getConsoleState);
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const { accepted } =
    appTextSource[appLang].console.targetDetails;

  return (
    <>
      <Text
        style={{
          color,
          fontSize: 20,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        {accepted}
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          height: 50,
        }}
        contentContainerStyle={{
          padding: 5,
        }}
      >
        {solutions.map((solution, index) => {
          return <Solution {...{ solution, key: index }} />;
        })}
      </ScrollView>
    </>
  );
};

export default Solutions;
