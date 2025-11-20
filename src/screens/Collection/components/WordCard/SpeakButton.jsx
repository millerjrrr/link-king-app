import { StyleSheet, View } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import ReadWordButton from "@src/screens/Console/components/ReadWordButton";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const SpeakButton = ({
  showSpeaker = true,
  speakWord = "error",
  height = 50,
}) => {
  const { colorScheme } = useSelector(settingsState);
  return (
    <View
      {...{
        style: [
          styles.container,
          { backgroundColor: colors[colorScheme].PRIMARY },
        ],
      }}
    >
      <ReadWordButton
        {...{
          showSpeaker,
          speakWord,
          height,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: base * 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SpeakButton;
