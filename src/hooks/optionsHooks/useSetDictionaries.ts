import { useNavigation } from "@react-navigation/native";
import clientWithAuth from "@src/api/clientWithAuth";
import useCatchAsync from "@src/hooks/useCatchAsync";
import { updateBusyState } from "@src/store/auth";
import { settingsState } from "@src/store/settings";
import languageNameCodeMap from "@src/utils/languageNameCodeMap";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Dictionary {
  name: string;
  code: string;
}
const useSetDictionaries = (
  setDictionaries: Dispatch<SetStateAction<string[]>>,
) => {
  const { appLang } = useSelector(settingsState);
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const navigation = useNavigation();

  const setDictioanariesFunction = catchAsync(async () => {
    try {
      dispatch(updateBusyState(true));
      const { data } = await clientWithAuth.get(
        "/api/v1/collection/get-dictionaries",
      );

      const dictionaries = data.dictionaries
        .map((item: Dictionary) => item.name)
        .sort((a: string, b: string) => {
          if (a === "English") return -1; // 'en' should come first
          if (b === "English") return 1; // 'en' should come first
          return a.localeCompare(b); // Sort alphabetically for other values
        });

      setDictionaries(
        dictionaries.filter(
          (item: string) =>
            languageNameCodeMap[item] !== appLang,
        ),
      );
    } finally {
      dispatch(updateBusyState(false));
    }
  });

  useEffect(() => {
    setDictioanariesFunction();
  }, [navigation]);
};

export default useSetDictionaries;
