import { MaterialCommunityIcons } from "@expo/vector-icons";
import useColors from "@src/hooks/useColors";
import { selectConsoleLocals } from "@src/store/console";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import useToggleBGMusic from "@src/hooks/consoleHooks/useToggleBGMusic";

const BackMusicButton = () => {
  const { SECONDARY } = useColors();
  const toggleBGMusic = useToggleBGMusic();

  const { musicIsPlaying } = useSelector(
    selectConsoleLocals,
  );

  return (
    <TouchableOpacity
      onPress={toggleBGMusic}
      style={{
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name={musicIsPlaying ? "music" : "music-off"}
        size={24}
        color={SECONDARY}
      />
    </TouchableOpacity>
  );
};

export default BackMusicButton;
