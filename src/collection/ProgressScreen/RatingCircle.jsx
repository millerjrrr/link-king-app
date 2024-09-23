import { Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getStatsState } from "../../store/stats";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import { getConsoleState } from "../../store/console";
import AppText from "../../ui/AppText";

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
