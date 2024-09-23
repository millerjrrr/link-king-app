import { useSelector } from "react-redux";
import PopUpContainer from "../../../../components/containers/PopUpContainer";
import { getSettingsState } from "../../../../store/settings";
import appTextSource from "../../../../utils/appTextSource";
import LanguageSearchBar from "./LanguageSearchBar";
import { useEffect, useState } from "react";
import getLanguageData from "./getLanguageData";
import LanguageList from "./LanguageList";

const SelectNewHomeLanguageScreen = () => {
  const { appLang } = useSelector(getSettingsState);
  const { changeHomeLanguage: heading } =
    appTextSource(appLang).options.manageAccount;

  const [searchKeyword, setSearchKeyword] = useState("");
  const [languages, setLanguages] =
    useState(getLanguageData);

  useEffect(() => {
    setLanguages(
      getLanguageData.filter((language) =>
        language.native.includes(searchKeyword),
      ),
    );
  }, [searchKeyword]);

  return (
    <PopUpContainer {...{ heading, blockPopToTop: true }}>
      <LanguageSearchBar
        {...{ searchKeyword, setSearchKeyword }}
      />
      <LanguageList {...{ languages }} />
    </PopUpContainer>
  );
};

export default SelectNewHomeLanguageScreen;
