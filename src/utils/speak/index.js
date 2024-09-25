import * as Speech from "expo-speech";
import checkTTSDataAndPerformAction from "./checkTTSDataAndPerformAction";

export const speak = async ({
  target,
  language,
  sound,
}) => {
  if (sound) {
    checkTTSDataAndPerformAction({
      language,
      callback: async () =>
        Speech.stop().then(
          await Speech.speak(target, {
            language,
            pitch: 1 + Math.random() * 0.5,
            // voice,
          }),
        ),
    });
  }
};
