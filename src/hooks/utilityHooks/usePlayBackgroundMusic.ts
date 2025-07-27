import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import useCatchAsync from "@src/hooks/utilityHooks/useCatchAsync";
import { useSelector } from "react-redux";
import { selectConsoleLocals } from "@src/store/console";
declare function require(path: string): any;

const usePlayBackgroundMusic = () => {
  const [soundPlaying, setSound] =
    useState<Audio.Sound | null>(null);
  const catchAsync = useCatchAsync();
  const { musicIsPlaying } = useSelector(
    selectConsoleLocals,
  );

  const playBackgroundMusic = catchAsync(async () => {
    if (soundPlaying) {
      const currentSound = soundPlaying;
      setSound(null); // Reset sound state before stopping

      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }

    if (musicIsPlaying) {
      // Dispatch Redux update after ensuring sound stopped

      const file = require("@assets/sounds/BackgroundMusic.mp3");
      const { sound } = await Audio.Sound.createAsync(
        file,
        {
          shouldPlay: true,
          isLooping: true,
        },
      );

      setSound(sound);
      await sound.setVolumeAsync(0.1);
      await sound.playAsync();
    }
  });

  useEffect(() => {
    playBackgroundMusic();
  }, [musicIsPlaying]);
};

export default usePlayBackgroundMusic;
