import { useSelector } from "react-redux";
import appTextSource from "@src/utils/appTextSource";
import { getSettingsState } from "@src/store/settings";
import Name from "../../auth/SignUp/Name";

const ChangeNameScreen = () => {
  const { appLang } = useSelector(getSettingsState);

  const buttonTitle =
    appTextSource(appLang).options.manageAccount.save;

  return (
    <Name {...{ updateNameFunction: true, buttonTitle }} />
  );
};

export default ChangeNameScreen;
