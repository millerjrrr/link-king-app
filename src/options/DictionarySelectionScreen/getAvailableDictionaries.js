import clientWithAuth from "../../api/clientWithAuth";
import languageNameCodeMap from "../../utils/languageNameCodeMap";

const getAvailableDictionaries = async ({
  appLang,
  setDictionaries,
}) => {
  let dictionaries = [];

  try {
    const {
      data: { dictionaries: availableDictionaries },
    } = await clientWithAuth.get(
      "/api/v1/collection/get-dictionaries",
    );
    dictionaries = availableDictionaries.map(
      (item) => item.name,
    );
  } catch (e) {
    dictionaries = [];
  }
  setDictionaries(
    dictionaries.filter(
      (item) => languageNameCodeMap[item] !== appLang,
    ),
  );
};

export default getAvailableDictionaries;
