import { Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import colors from "@assets/themes/colors";
import { useSelector } from "react-redux";
import { getStatsState } from "@src/store/stats";
import { getSettingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { getConsoleState } from "@src/store/console";
import AppText from "@src/components/AppText";

const RatingCircle = () => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const green = colors[colorScheme].GREEN;
  const {
    userGameData: { rating },
  } = useSelector(getStatsState);
  const { dictionary } = useSelector(getConsoleState);

  const { textA, textB } =
    appTextSource(appLang).collection.progressScreen;
  return (
    <>
      <AppText
        style={{
          fontSize: 20,
          paddingTop: 10,
          color: green,
        }}
      >
        {textA + dictionary + textB}
      </AppText>
      <View style={{ paddingVertical: 15 }}>
        <CircularProgress
          value={rating}
          radius={100}
          maxValue={2500}
          progressValueColor={color}
          activeStrokeSecondaryColor={color}
          activeStrokeColor={green}
          inActiveStrokeColor={green}
          inActiveStrokeOpacity={0.2}
          allowFontScaling={false}
        />
      </View>
    </>
  );
};

export default RatingCircle;
