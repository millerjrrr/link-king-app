import { Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { statsState } from "@src/store/stats";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { selectConsoleState } from "@src/store/console";
import AppText from "@src/components/AppText";

const RatingCircle = () => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const green = colors[colorScheme].GREEN;
  const {
    userGameData: { rating },
  } = useSelector(statsState);
  const { dictionary } = useSelector(selectConsoleState);

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
