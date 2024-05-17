import { Feather } from "@expo/vector-icons";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { speak } from "expo-speech";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import AppText from "../ui/AppText";

const ReadWordButton = () => {
  const {
    attempt: { target, speechLang },
    options: { blurred },
  } = useSelector(getConsoleState);

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

const styles = StyleSheet.create({
  container: {
    height: 75,
    justifyContent: "center",
    zIndex: 10,
  },
});

export default ReadWordButton;
