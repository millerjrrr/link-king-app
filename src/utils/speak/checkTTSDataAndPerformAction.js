import { Alert, Linking, Platform } from "react-native";
import * as Speech from "expo-speech";

const openTTSSettings = () => {
  if (Platform.OS === "android") {
    Linking.canOpenURL(
      "com.android.settings.TTS_SETTINGS",
    ).then((supported) => {
      if (supported) {
        Linking.openURL(
          "com.android.settings.TTS_SETTINGS",
        );
      } else {
        Alert.alert(
          "Unable to open settings",
          "Please manually navigate to the Text-to-Speech settings on your device. Go to 'Settings -> General Management -> Text-To-Speech'.",
        );
      }
    });
  }
};

const checkTTSDataAndPerformAction = async ({
  language,
  callback,
}) => {
  if (Platform.OS === "android") {
    const code = language.slice(0, 2);
    await Speech.getAvailableVoicesAsync();
    setTimeout(async () => {
      const languages =
        await Speech.getAvailableVoicesAsync();

      const voice = await languages.find(
        (voice) => voice.language.slice(0, 2) === code,
      );

      const languageMap = {
        en: "English",
        es: "Spanish",
        fr: "French",
        de: "German",
        it: "Italian",
        pt: "Portuguese",
        zh: "Chinese",
        ja: "Japanese",
        ru: "Russian",
        ar: "Arabic",
        hi: "Hindi",
      };

      const languageName = languageMap[code]
        ? `${languageMap[code]} (${code})`
        : code;

      if (!voice) {
        Alert.alert(
          "TTS Data Required",
          `This app requires text-to-speech data. Please install a "${languageName}" language pack.`,
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Install",
              onPress: () => {
                openTTSSettings();
              },
            },
          ],
        );
      } else callback();
    }, 100);
  } else {
    callback();
  }
};

export default checkTTSDataAndPerformAction;
