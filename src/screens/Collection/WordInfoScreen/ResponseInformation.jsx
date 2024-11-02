import { useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";

const ResponseInformation = ({
  status,
  wrongAnswerReturned,
}) => {
  const { appLang } = useSelector(getSettingsState);

  const { responseA, responseB } = wrongAnswerReturned
    ? appTextSource(appLang).console.targetDetails
    : appTextSource(appLang).collection.wordInfoScreen;

  return status ? (
    <AppText
      style={{
        marginHorizontal: 10,
      }}
    >
      {responseA}
    </AppText>
  ) : (
    <AppText
      style={{
        marginHorizontal: 15,
      }}
    >
      {responseB}
    </AppText>
  );
};

export default ResponseInformation;
