import { useSelector } from "react-redux";
import appTextSource from "../../../utils/appTextSource";
import { getSettingsState } from "../../../store/settings";
import Name from "../../../screens/auth/SignUp/Name";

const ChangeNameScreen = () => {
  const { appLang } = useSelector(getSettingsState);

  const buttonTitle =
    appTextSource(appLang).options.manageAccount.save;

  return (
    <Name {...{ updateNameFunction: true, buttonTitle }} />
  );
};

export default ChangeNameScreen;
