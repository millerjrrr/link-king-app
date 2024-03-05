import { Entypo } from "@expo/vector-icons";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import { LevelStarsContainer } from "./WordCardStyledComponents";

const WordCardLevelStars = ({ stars, target }) => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];
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
