import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import AppText from "../../ui/AppText";

const AcceptedAnswers = () => {
  const { appLang } = useSelector(getSettingsState);

  const { accepted } =
    appTextSource(appLang).console.targetDetails;

  return (
    <AppText
      style={{
        fontSize: 20,
        marginTop: 10,
      }}
    >
      {accepted}
    </AppText>
  );
};

export default AcceptedAnswers;
