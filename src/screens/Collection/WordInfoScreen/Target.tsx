import { useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import AppText from "@src/components/AppText";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const Target = () => {
  const { gamePlay } = useSelector(selectConsoleState);

  //font-size management
  let fontSize = 40;
  const length = gamePlay.target.length;
  if (length > 12) fontSize = (fontSize * 12) / length;

  return (
    <AppText
      style={{
        fontSize: base * fontSize,
        margin: base * 5,
        zIndex: 1,
      }}
    >
      {gamePlay.target}
    </AppText>
  );
};

export default Target;
