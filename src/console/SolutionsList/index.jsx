import { Text, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import SolutionItem from "./SolutionItem";
import HorizontalScrollFade from "./HorizonatalScrollFade";

const SolutionsList = ({ showTitle = true }) => {
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
    <HorizontalScrollFade>
      <View style={{ height: 90, alignItems: "center" }}>
        {showTitle ? (
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
        ) : (
          <View style={{ height: 5 }} />
        )}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: 5,
            paddingHorizontal: 10,
            alignItems: "center",
          }}
        >
          {solutions.map((solution, index) => {
            return (
              <SolutionItem {...{ solution, key: index }} />
            );
          })}
        </ScrollView>
      </View>
    </HorizontalScrollFade>
  );
};

export default SolutionsList;
