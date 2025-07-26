import { Audio, InterruptionModeIOS } from "expo-av";
declare function require(path: string): any;

const bing = require("assets/sounds/_correct.mp3");
const buzz = require("assets/sounds/_wrong.mp3");

type PlaySoundCallback = () => void;

const usePlaySound = () => {
  const playSound = async (
    name: "bing" | "buzz",
    callback?: PlaySoundCallback,
  ): Promise<void> => {
    try {
      const file = name === "bing" ? bing : buzz;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true, // Forces audio even in silent mode
        staysActiveInBackground: true, // Keeps it running in the background
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
      });

      // Force aud
      const { sound } = await Audio.Sound.createAsync(file);
      const status = await sound.getStatusAsync();
      const timer =
        JSON.parse(JSON.stringify(status)).durationMillis +
        200;
      setTimeout(async () => {
        await sound.unloadAsync();
        if (callback) callback();
      }, timer);
      await sound.playAsync();
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  return playSound;
};

export default usePlaySound;
