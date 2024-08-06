import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import FlagImage from "../../ui/Graphics/FlagImage";

const FlagBookImage = () => {
  const { dictionary } = useSelector(getConsoleState);

  const [flag1, flag2] = dictionary.split("-");

  return <FlagImage {...{ flag1, flag2, scale: 2.5 }} />;
};

export default FlagBookImage;
