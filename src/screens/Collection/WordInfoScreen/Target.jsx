import { useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import AppText from "@src/components/AppText";

const Target = () => {
  const { gamePlay } = useSelector(selectConsoleState);

  //font-size management
  let fontSize = 40;
  const length = gamePlay.target.length;
  if (length > 12) fontSize = (fontSize * 12) / length;

  return (
    <AppText
      style={{
        fontSize,
        margin: 5,
        zIndex: 1,
      }}
    >
      {gamePlay.target}
    </AppText>
  );
};

export default Target;
