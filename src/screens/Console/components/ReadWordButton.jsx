import { Feather } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import AppText from "../../../components/AppText";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { speak } from "@src/utils/appSpeak";
import { updateNotification } from "@src/store/notification";
import appTextSource from "@src/utils/appTextSource";

const ReadWordButton = ({
  showSpeaker,
  speakWord,
  height = 75,
}) => {
  const {
    gamePlay: { target, speechLang: language },
    options: { blurred, sound },
  } = useSelector(selectConsoleState);
  const { appLang } = useSelector(settingsState);

  const dispatch = useDispatch();

  const { sound: message } =
    appTextSource(appLang).console.statsMessages;

  const newTarget = speakWord ? speakWord : target;
  const onPress = async () => {
    if (sound)
      speak({ target: newTarget, language, sound });
    else
      dispatch(
        updateNotification({
          message,
          type: "info",
        }),
      );
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
        justifyContent: "center",
        zIndex: 10,
      }}
    >
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
