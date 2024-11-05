import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";
import { collectionState } from "@src/store/collection";

const ResponseInformation = () => {
  const { appLang } = useSelector(settingsState);
  const { wordDeletedSuccessfully } =
    useSelector(collectionState);

  const { successResponse, failedResponse } =
    appTextSource(appLang).collection.wordInfoScreen;

  return (
    <AppText style={{ marginHorizontal: 15 }}>
      {wordDeletedSuccessfully
        ? successResponse
        : failedResponse}
    </AppText>
  );
};

export default ResponseInformation;
