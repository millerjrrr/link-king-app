import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const BottomShadow = () => {
  const { colorScheme, golden } =
    useSelector(settingsState);

  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <LinearGradient
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: base * 5,
        zIndex: 10,
      }}
      colors={[color + "00", color + "60"]}
    />
  );
};

export default BottomShadow;
