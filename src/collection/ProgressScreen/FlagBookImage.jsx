import { useSelector } from "react-redux";
import { getConsoleState } from "@src/store/console";
import FlagImage from "../../components/Graphics/FlagImage";
import { getSettingsState } from "@src/store/settings";
import languageNameCodeMap from "@src/utils/languageNameCodeMap";

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
