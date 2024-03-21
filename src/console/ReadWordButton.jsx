import { Feather } from "@expo/vector-icons";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import colors from "../utils/colors";
import { speak } from "expo-speech";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import { getSettingsState } from "../store/settings";

const ReadWordButton = () => {
  const {
    attempt: { target, speechLang },
    options: { blurred },
  } = useSelector(getConsoleState);
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const onPress = async () => {
    speak(target, {
      language: speechLang,
    });
  };

  //font-size management
  let fontSize = 48;
  const length = target.length;
  if (length > 12) fontSize = (fontSize * 12) / length;

  return (
    <View style={styles.container}>
      <TouchableOpacity {...{ onPress }}>
        {blurred ? (
          <Feather
            {...{ name: "volume-2", size: 48, color }}
          />
        ) : (
          <Text
            style={{
              textAlign: "center",
              paddingBottom: 10,
              fontSize,
              color,
            }}
          >
            {target}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    justifyContent: "center",
    zIndex: 10,
  },
});

export default ReadWordButton;
