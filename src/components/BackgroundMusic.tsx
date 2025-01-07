import { useEffect, useState } from "react";
import { Audio } from "expo-av";
declare function require(path: string): any;

const BackgroundMusic = () => {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const loadAndPlayMusic = async () => {
      const file = require("@assets/backgroundMusic/Symph40Mozart.mp3");
      const { sound } = await Audio.Sound.createAsync(
        file, // Adjust the path as necessary
        { shouldPlay: true, isLooping: true },
      );
      await sound.playAsync();
    };

    loadAndPlayMusic();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return null;
};

export default BackgroundMusic;
