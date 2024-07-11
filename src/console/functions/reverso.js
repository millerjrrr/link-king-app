import axios from "axios";
import { errorHandler } from "./../../errors/errorHandler";

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
    errorHandler(error, dispatch);
  }
};

const returnReversoData = async ({ data }) => {
  let {
    dictionary,
    gamePlay: { target, solutions },
  } = data;

  if (dictionary === "Personal")
    dictionary = "Portuguese-English";

  const [fromLang, toLang] = dictionary.split("-");

  const from = fromLang.substring(0, 3).toLowerCase();
  const to = toLang.substring(0, 3).toLowerCase();

  const reversoData = await reversoTranslate({
    word: target,
    from,
    to,
  });

  reversoData.forEach((solution) => {
    if (!solutions.includes(solution) && solution !== "")
      solutions.push(solution);
  });

  return {
    ...data,
    gamePlay: {
      ...data.gamePlay,
      solutions,
    },
  };
};

export default returnReversoData;
