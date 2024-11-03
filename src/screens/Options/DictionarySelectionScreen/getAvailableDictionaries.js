import clientWithAuth from "@src/api/clientWithAuth";
import languageNameCodeMap from "@src/utils/languageNameCodeMap";

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
    dictionaries = availableDictionaries
      .map((item) => item.name)
      .sort((a, b) => {
        if (a === "English") return -1; // 'en' should come first
        if (b === "English") return 1; // 'en' should come first
        return a.localeCompare(b); // Sort alphabetically for other values
      });
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
