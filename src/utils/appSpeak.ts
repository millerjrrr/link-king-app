import * as Speech from "expo-speech";

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
    await Speech.stop();
    await Speech.speak(target, {
      language,
      pitch: 1 + Math.random() * 0.5,
    });
  }
};
