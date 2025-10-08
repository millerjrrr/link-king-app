import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";

const AcceptedAnswers = () => {
  const { appLang } = useSelector(settingsState);

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
