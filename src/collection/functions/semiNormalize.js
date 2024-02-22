export const semiNormalize = (inputString) => {
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

  return string
    .replace(/[áéíóúàèìòùâêîôûãõñç]/gi, function (matched) {
      return accentsMap[matched];
    })
    .replace(/[^a-zA-Z0-9 ]/g, "");
};
