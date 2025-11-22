import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const AcceptedAnswers = () => {
  const { appLang } = useSelector(settingsState);

  const { accepted } =
    appTextSource(appLang).console.targetDetails;

  return (
    <AppText
      style={{
        fontSize: base * 20,
        marginTop: base * 10,
      }}
    >
      {accepted}
    </AppText>
  );
};

export default AcceptedAnswers;
