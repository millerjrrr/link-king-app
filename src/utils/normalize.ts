const removeRepeatedLetters = (string: string) => {
  const result = [];
  let prevChar = null;
  for (const char of string) {
    if (char !== prevChar) {
      result.push(char);
    }
    prevChar = char;
  }

  return result.join("");
};

export const normalize = (inputString: string) => {
  let string = inputString + "";
  const accentsMap = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    à: "a",
    è: "e",
    ì: "i",
    ò: "o",
    ù: "u",
    â: "a",
    ê: "e",
    î: "i",
    ô: "o",
    û: "u",
    ã: "a",
    õ: "o",
    ñ: "n",
    ç: "c",
  };

  string = string.toLowerCase();

  type AccentedChar = keyof typeof accentsMap;

  string = string
    .trim()
    .replace(
      /[áéíóúàèìòùâêîôûãõñç]/g,
      (matched) =>
        accentsMap[matched as AccentedChar] || matched,
    )
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(
      /(?:to |the |a |an |de |para |á |o |um |uma )/g,
      "",
    )
    .replace(/ /g, "")
    .replace(/nt/g, "not")
    .replace(/(as?|os?)\b$/, "o");

  string = removeRepeatedLetters(string);
  return string;
};
