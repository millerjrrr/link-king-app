import * as Speech from "expo-speech";
import checkTTSDataAndPerformAction from "./checkTTSDataAndPerformAction";

export const speak = async ({
  target,
  language,
  sound,
}: {
  target: string;
  language: string;
  sound: boolean;
}) => {
  if (sound) {
    checkTTSDataAndPerformAction({
      language,
      callback: async () => {
        await Speech.stop();
        await Speech.speak(target, {
          language,
          pitch: 1 + Math.random() * 0.5,
        });
      },
    });
  }
};
