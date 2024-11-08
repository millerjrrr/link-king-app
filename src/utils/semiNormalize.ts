export const semiNormalize = (inputString: string) => {
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

  return string
    .replace(
      /[áéíóúàèìòùâêîôûãõñç]/g,
      (matched) =>
        accentsMap[matched as AccentedChar] || matched,
    )
    .replace(/[^a-zA-Z0-9 ]/g, "");
};
