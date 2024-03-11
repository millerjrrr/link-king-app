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
import { getColorsState } from "../store/colors";

const ReadWordButton = ({ size = 48 }) => {
  const {
    attempt: { target, speechLang },
    options: { blurred },
  } = useSelector(getConsoleState);
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const color = colors[colorScheme].CONTRAST[golden];

  const onPress = async () => {
    speak(target, {
      language: speechLang,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity {...{ onPress }}>
        {blurred ? (
          <Feather {...{ name: "volume-2", size, color }} />
        ) : (
          <Text
            style={{
              textAlign: "center",
              paddingBottom: 10,
              fontSize: size,
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
