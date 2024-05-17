import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import AppText from "../../ui/AppText";

const ResponseInformation = ({ status }) => {
  const { appLang } = useSelector(getSettingsState);

  const { resA, resB } =
    appTextSource[appLang].collection.deleteScreen;

  return status ? (
    <AppText>{resA}</AppText>
  ) : (
    <AppText>{resB}</AppText>
  );
};

export default ResponseInformation;
