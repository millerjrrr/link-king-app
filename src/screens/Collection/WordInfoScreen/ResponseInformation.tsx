import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";
import { collectionState } from "@src/store/collection";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const ResponseInformation = () => {
  const { appLang } = useSelector(settingsState);
  const { wordDeletedSuccessfully } =
    useSelector(collectionState);

  const { successResponse, failedResponse } =
    appTextSource(appLang).collection.wordInfoScreen;

  return (
    <AppText style={{ marginHorizontal: base * 15 }}>
      {wordDeletedSuccessfully
        ? successResponse
        : failedResponse}
    </AppText>
  );
};

export default ResponseInformation;
