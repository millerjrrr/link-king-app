import { Audio, InterruptionModeIOS } from "expo-av";
import * as Speech from "expo-speech";
import { Platform } from "react-native";

declare function require(path: string): any;

const configureAudio = async () => {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true, // Forces audio even in silent mode
    staysActiveInBackground: true, // Keeps it running in the background
    interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    shouldDuckAndroid: false,
    playThroughEarpieceAndroid: false,
  });
  // Force audio output through the speaker
  const soundObject = new Audio.Sound();
  await soundObject.loadAsync(
    require("@assets/sounds/SilentTrick.mp3"),
    { shouldPlay: true },
  );
  await soundObject.unloadAsync();
};

export const speak = async ({
  target,
  language,
  sound,
}: {
  target: string;
  language: string;
  sound: boolean;
}) => {
  await configureAudio();

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
