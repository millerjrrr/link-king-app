import { Entypo } from "@expo/vector-icons";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { LevelStarsContainer } from "./WordCardStyledComponents";
import { getColorsState } from "../store/colors";

const WordCardLevelStars = ({ stars, target }) => {
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const levelArray = Array.from(new Array(stars));

  return (
    <LevelStarsContainer>
      {levelArray.map((_, index) => (
        <Entypo
          {...{
            name: "star",
            key: `star-${target}-${index}`,
            size: 12,
            color,
          }}
        />
      ))}
    </LevelStarsContainer>
  );
};

export default WordCardLevelStars;
