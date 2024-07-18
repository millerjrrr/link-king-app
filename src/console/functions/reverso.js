import axios from "axios";

const reversoTranslate = async ({ word, from, to }) => {
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
};

const returnReversoData = async ({ data }) => {
  try {
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

    solutions = solutions.map((solution) =>
      solution.trim(),
    );

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
  } catch (error) {
    return data;
  }
};

export default returnReversoData;
