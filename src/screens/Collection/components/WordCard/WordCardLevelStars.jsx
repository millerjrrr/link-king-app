import { Entypo } from "@expo/vector-icons";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { LevelStarsContainer } from "./StyledComponents";
import { settingsState } from "@src/store/settings";

const WordCardLevelStars = ({ stars, target }) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
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
