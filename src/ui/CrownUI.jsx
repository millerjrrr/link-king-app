// import { View } from "react-native";
import colors from "../utils/colors";
import { Image } from "react-native";

const CrownUI = ({ size, position, rotation }) => {
  let viewPosition;
  let indent = 0.5;

  switch (position) {
    case "top-left":
      viewPosition = {
        top: (-size * indent) / 2,
        left: (-size * indent) / 2,
      };
      break;
    case "top-right":
      viewPosition = {
        top: (-size * indent) / 2,
        right: (-size * indent) / 2,
      };
      break;
    case "bottom-left":
      viewPosition = {
        bottom: (-size * indent) / 2,
        left: (-size * indent) / 2,
      };
      break;
    case "bottom-right":
      viewPosition = {
        bottom: (-size * indent) / 2,
        right: (-size * indent) / 2,
      };
      break;
  }
  return (
    <Image
      source={require("../assets/link-crown-symbol.png")}
      resizeMode="contain"
      style={{
        tintColor: "black",
        width: size / 1,
        height: size / 1,
        position: "absolute",
        transform: [{ rotateZ: rotation + "deg" }],
        ...viewPosition,
      }}
    />
  );
};

export default CrownUI;
