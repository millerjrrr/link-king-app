import { useSelector } from "react-redux";
import appTextSource from "../../../utils/appTextSource";
import Name from "../../../views/auth/SignUp/Name";
import { getSettingsState } from "../../../store/settings";

const ChangeNameScreen = () => {
  const { appLang } = useSelector(getSettingsState);

  const buttonTitle =
    appTextSource(appLang).options.manageAccount.save;

  return (
    <Name {...{ updateNameFunction: true, buttonTitle }} />
  );
};

export default ChangeNameScreen;
