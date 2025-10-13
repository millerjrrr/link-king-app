import { useSelector } from "react-redux";
import PopUpContainer from "../../../../components/Containers/PopUpsContainer";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import LanguageSearchBar from "./LanguageSearchBar";
import { useEffect, useState } from "react";
import getLanguageData from "./getLanguageData";
import LanguageList from "./LanguageList";
import { normalize } from "@src/utils/normalize";

const SelectNewHomeLanguageScreen: React.FC<{
  unprotect?: boolean;
}> = ({ unprotect }) => {
  const { appLang } = useSelector(settingsState);
  const { changeHomeLanguage: heading } =
    appTextSource(appLang).options.manageAccount;

  const [searchKeyword, setSearchKeyword] = useState("");
  const [languages, setLanguages] =
    useState(getLanguageData);

  useEffect(() => {
    setLanguages(
      getLanguageData.filter((language) => {
        const normalized = normalize(language.native);
        return normalized.includes(searchKeyword);
      })
    );
  }, [searchKeyword]);

  return (
    <PopUpContainer heading={heading}>
      <LanguageSearchBar
        {...{ searchKeyword, setSearchKeyword }}
      />
      <LanguageList {...{ languages, unprotect }} />
    </PopUpContainer>
  );
};

export default SelectNewHomeLanguageScreen;
