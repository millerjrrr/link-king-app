import * as Speech from "expo-speech";
import { Platform } from "react-native";

export const speak = async ({
  target,
  language,
  sound,
}: {
  target: string;
  language: string;
  sound: boolean;
}) => {
  if (Platform.OS !== "web") {
    if (sound) {
      await Speech.stop();
      await Speech.speak(target, {
        language,
        pitch: 1 + Math.random() * 0.5,
      });
    }
  } else {
    if (sound && "speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(
        target,
      );
      utterance.lang = language;
      utterance.pitch = 1 + Math.random() * 0.5;

      // Stop any ongoing speech
      synth.cancel();

      // Speak the new text
      synth.speak(utterance);
    }
  }
};
