import * as Speech from "expo-speech";
import checkTTSDataAndPerformAction from "./checkTTSDataAndPerformAction";

export const speak = async ({
  target,
  language,
  sound,
}) => {
  if (sound) {
    // const availableVoices = (
    //   await Speech.getAvailableVoicesAsync()
    // ).filter(
    //   (voice) =>
    //     voice.language.slice(0, 2) === language.slice(0, 2),
    // );
    // const index = Math.floor(
    //   Math.min(availableVoices.length, 5) * Math.random(),
    // );
    // const voice = availableVoices[index].identifier;

    // console.log(availableVoices, availableVoices.length);

    checkTTSDataAndPerformAction({
      language,
      callback: async () =>
        Speech.stop().then(
          await Speech.speak(target, {
            language,
            pitch: 0.75 + Math.random() * 0.5,
            // voice,
          }),
        ),
    });
  }
};
