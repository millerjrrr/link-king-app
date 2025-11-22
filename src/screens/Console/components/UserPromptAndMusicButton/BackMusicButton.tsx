import { MaterialCommunityIcons } from "@expo/vector-icons";
import useColors from "@src/hooks/utilityHooks/useColors";
import { selectConsoleLocals } from "@src/store/console";
import { useSelector } from "react-redux";
import useToggleBGMusic from "@src/hooks/consoleHooks/useToggleBGMusic";
import screenDimensions from "@src/utils/screenDimensions";
import { TouchableOpacity } from "react-native";
const { base } = screenDimensions();

const BackMusicButton = () => {
  const { SECONDARY } = useColors();
  const toggleBGMusic = useToggleBGMusic();

  const { musicIsPlaying } = useSelector(
    selectConsoleLocals
  );

  return (
    <TouchableOpacity
      onPress={toggleBGMusic}
      style={{
        padding: base * 15,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name={musicIsPlaying ? "music" : "music-off"}
        size={base * 24}
        color={SECONDARY}
      />
    </TouchableOpacity>
  );
};

export default BackMusicButton;
