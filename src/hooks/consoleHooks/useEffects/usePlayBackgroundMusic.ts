import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { Platform } from "react-native";
declare function require(path: string): any;

const usePlayBackgroundMusic = () => {
  const [soundPlaying, setSound] =
    useState<Audio.Sound | null>(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      const loadAndPlayMusic = async () => {
        if (soundPlaying) {
          await soundPlaying.stopAsync();
          await soundPlaying.unloadAsync();
          setSound(null); // Reset the sound state
        }

        const file =
          Platform.OS === "web"
            ? "assets/assets/backgroundMusic/Symph40Mozart.mp3"
            : require("@assets/backgroundMusic/Symph40Mozart.mp3");
        const { sound } = await Audio.Sound.createAsync(
          file, // Adjust the path as necessary
          { shouldPlay: true, isLooping: true },
        );
        setSound(sound);
        await sound.setVolumeAsync(0.2);
        await sound.playAsync();
      };

      loadAndPlayMusic();

      return () => {
        if (soundPlaying) soundPlaying.unloadAsync();
      };
    }
  }, []);
};

export default usePlayBackgroundMusic;
