import { View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import colors from "@src/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { statsState } from "@src/store/stats";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { selectConsoleState } from "@src/store/console";
import AppText from "@src/components/AppText";
import HelpButton from "@src/components/Buttons/HelpButton";
import { updateModals } from "@src/store/modals";
import useColors from "@src/hooks/utilityHooks/useColors";

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

  const translatedDictionary =
    appTextSource(appLang).languageNames[dictionary];

  const dispatch = useDispatch();

  const help = () =>
    dispatch(
      updateModals({ modalShowing: "ratingInfoModal" }),
    );

  const { GREEN: tintColor } = useColors();

  return (
    <>
      <AppText
        style={{
          fontSize: 20,
          paddingTop: 10,
          color: green,
        }}
      >
        {textA + translatedDictionary + textB}
      </AppText>
      <View style={{ paddingVertical: 15 }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            right: -40,
            zIndex: 100,
          }}
        >
          <HelpButton
            help={help}
            nopadding
            tintColor={tintColor}
          />
        </View>
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
