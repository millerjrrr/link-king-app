import { useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import FlagImage from "@src/components/Graphics/FlagImage";
import { settingsState } from "@src/store/settings";
import languageNameCodeMap from "@src/utils/languageNameCodeMap";

const FlagBookImage = ({ scale = 2.5 }) => {
  const { dictionary } = useSelector(selectConsoleState);
  const { appLang } = useSelector(settingsState);
  const [flag1, flag2] = [
    appLang,
    languageNameCodeMap[dictionary],
  ];

  return <FlagImage {...{ flag1, flag2, scale }} />;
};

export default FlagBookImage;
