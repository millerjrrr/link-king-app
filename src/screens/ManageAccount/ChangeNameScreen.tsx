import { useSelector } from "react-redux";
import appTextSource from "@src/utils/appTextSource";
import { settingsState } from "@src/store/settings";
import NameScreen from "@auth/SignUp/NameScreen";

const ChangeNameScreen = () => {
  const { appLang } = useSelector(settingsState);

  const buttonTitle =
    appTextSource(appLang).options.manageAccount.save;

  return (
    <NameScreen updateName buttonTitle={buttonTitle} />
  );
};

export default ChangeNameScreen;
