import axios from "axios";

const reversoTranslate = async ({ word, from, to }) => {
  try {
    const entry = word.startsWith("to ")
      ? word.substring(3)
      : word;

    const { data } = await axios.post(
      "https://api.reverso.net/translate/v1/translation",
      {
        format: "text",
        from,
        input: entry,
        options: {
          contextResults: true,
          languageDetection: true,
          origin: "reversomobile",
          sentenceSplitter: false,
        },
        to,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const translations = [];
    data.contextResults.results.forEach((result) => {
      translations.push(result.translation);
    });
    return translations;
  } catch (error) {
    console.log(error);
  }
};

const returnReversoData = async ({ data }) => {
  const {
    dictionary,
    gamePlay: { target },
  } = data;

  const [fromLang, toLang] = dictionary.split("-");

  const from = fromLang.substring(0, 3).toLowerCase();
  const to = toLang.substring(0, 3).toLowerCase();

  const reversoData = await reversoTranslate({
    word: target,
    from,
    to,
  });

  return {
    ...data,
    gamePlay: {
      ...data.gamePlay,
      solutions: reversoData,
    },
  };
};

export default returnReversoData;
