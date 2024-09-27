import { Entypo } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { LevelStarsContainer } from "./WordCardStyledComponents";
import { getSettingsState } from "../../store/settings";

const WordCardLevelStars = ({ stars, target }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const levelArray = Array.from(new Array(stars));

  return (
    <LevelStarsContainer>
      {levelArray.map((_, index) => (
        <Entypo
          key={`star-${target}-${index}`}
          {...{
            name: "star",
            size: 15,
            color,
          }}
        />
      ))}
    </LevelStarsContainer>
  );
};

export default WordCardLevelStars;
