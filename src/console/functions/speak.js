import * as Speech from "expo-speech";

export const speak = async ({ target, language }) => {
  Speech.stop().then(
    Speech.speak(target, {
      language,
      pitch: 0.75 + Math.random() * 0.5,
    }),
  );
};
