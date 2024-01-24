import { View } from "react-native";
import colors from "../utils/colors";

const CircleUI = ({ size, position }) => {
  let viewPosition;

  switch (position) {
    case "top-left":
      viewPosition = {
        top: -size / 2,
        left: -size / 2,
      };
      break;
    case "top-right":
      viewPosition = {
        top: -size / 2,
        right: -size / 2,
      };
      break;
    case "bottom-left":
      viewPosition = {
        bottom: -size / 2,
        left: -size / 2,
      };
      break;
    case "bottom-right":
      viewPosition = {
        bottom: -size / 2,
        right: -size / 2,
      };
      break;
  }
  return (
    <View
      style={{
        width: size,
        height: size,
        position: "absolute",
        ...viewPosition,
      }}
    >
      <View
        style={{
          width: size / 1,
          height: size / 1,
          borderRadius: size / 2,
          backgroundColor: colors.SECONDARY,
          opacity: 0.3,
        }}
      />
      <View
        style={{
          width: size / 1.5,
          height: size / 1.5,
          borderRadius: size / 2,
          backgroundColor: colors.SECONDARY,
          opacity: 0.3,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: [
            {
              translateX: -size / 3,
            },
            {
              translateY: -size / 3,
            },
          ],
        }}
      />
    </View>
  );
};

export default CircleUI;
