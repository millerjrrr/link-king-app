import * as Speech from "expo-speech";

export const speak = async ({
  target,
  language,
  sound,
}) => {
  if (sound)
    Speech.stop().then(
      Speech.speak(target, {
        language,
        pitch: 0.75 + Math.random() * 0.5,
      }),
    );
};
