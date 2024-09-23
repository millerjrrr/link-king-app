import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import FlagImage from "../../ui/Graphics/FlagImage";
import { getSettingsState } from "../../store/settings";
import languageNameCodeMap from "../../utils/languageNameCodeMap";

const FlagBookImage = ({ scale = 2.5 }) => {
  const { dictionary } = useSelector(getConsoleState);
  const { appLang } = useSelector(getSettingsState);
  const [flag1, flag2] = [
    appLang,
    languageNameCodeMap[dictionary],
  ];

  return <FlagImage {...{ flag1, flag2, scale }} />;
};

export default FlagBookImage;
