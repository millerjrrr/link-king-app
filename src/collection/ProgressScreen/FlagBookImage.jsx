import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import FlagImage from "../../ui/Graphics/FlagImage";

const FlagBookImage = ({ scale = 2.5 }) => {
  const { dictionary } = useSelector(getConsoleState);
  const [flag1, flag2] = dictionary.includes("-")
    ? dictionary.split("-") || ["Portuguese", "English"]
    : ["Portuguese", "English"];

  return <FlagImage {...{ flag1, flag2, scale }} />;
};

export default FlagBookImage;
