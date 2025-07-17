import { Image } from "react-native";
import CrownImage from "@assets/adaptive-icon.png";

interface CrownUIProps {
  size: number;
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  rotation: number;
  color: `#{string}`;
}

const CrownUI: React.FC<CrownUIProps> = ({
  size = 96,
  position,
  rotation,
  color,
}) => {
  let viewPosition;
  let indent = 0.6;

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
      source={CrownImage}
      resizeMode="contain"
      tintColor={color}
      style={{
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
