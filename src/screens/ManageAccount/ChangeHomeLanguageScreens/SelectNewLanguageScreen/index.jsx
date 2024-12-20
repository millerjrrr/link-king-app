import { useSelector } from "react-redux";
import PopUpContainer from "../../../../components/Containers/PopUpContainer";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import LanguageSearchBar from "./LanguageSearchBar";
import { useEffect, useState } from "react";
import getLanguageData from "./getLanguageData";
import LanguageList from "./LanguageList";

const SelectNewHomeLanguageScreen = () => {
  const { appLang } = useSelector(settingsState);
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
    <PopUpContainer {...{ heading }}>
      <LanguageSearchBar
        {...{ searchKeyword, setSearchKeyword }}
      />
      <LanguageList {...{ languages }} />
    </PopUpContainer>
  );
};

export default SelectNewHomeLanguageScreen;
