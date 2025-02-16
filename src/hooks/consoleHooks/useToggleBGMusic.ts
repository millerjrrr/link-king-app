import { toggleMusicIsPlaying } from "@src/store/console";
import { useDispatch } from "react-redux";

const useToggleBGMusic = () => {
  const dispatch = useDispatch();

  const toggleBGMusic = () => {
    dispatch(toggleMusicIsPlaying());
  };

  return toggleBGMusic;
};

export default useToggleBGMusic;
