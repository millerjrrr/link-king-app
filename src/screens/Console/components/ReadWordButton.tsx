import { Feather } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import AppText from "@src/components/AppText";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { speak } from "@src/utils/appSpeak";
import { updateModals } from "@src/store/modals";
import useCheckTTSData from "@src/hooks/consoleHooks/useCheckTTSData";
import LevelPopAnimation from "../../../components/LevelPopAnimation";

interface ReadWordButtonProps {
  showSpeaker?: boolean;
  speakWord?: string;
  height?: number;
}
const ReadWordButton: React.FC<ReadWordButtonProps> = ({
  showSpeaker,
  speakWord,
  height = 75,
}) => {
  const {
    gamePlay: { target, speechLang: language },
    locals: {
      options: { blurred, sound },
    },
  } = useSelector(selectConsoleState);

  const dispatch = useDispatch();
  const checkTTSData = useCheckTTSData();

  const newTarget = !!speakWord ? speakWord : target;
  const onPress = async () => {
    const TTS = sound || (await checkTTSData());
    if (!TTS)
      dispatch(
        updateModals({ modalShowing: "missingTTSModal" })
      );
    else
      speak({ target: newTarget, language, sound: true });
  };

  //font-size management
  let fontSize = 48;
  const length = target.length;
  if (length > 12) fontSize = (fontSize * 12) / length;

  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <View
      style={{
        height,
        width: "100%",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      <LevelPopAnimation />
      <TouchableOpacity {...{ onPress }}>
        {blurred || showSpeaker ? (
          <Feather
            {...{
              name: "volume-2",
              size: 0.66 * height,
              color,
            }}
          />
        ) : (
          <AppText
            style={{
              paddingBottom: 10,
              fontSize,
            }}
          >
            {target}
          </AppText>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ReadWordButton;
