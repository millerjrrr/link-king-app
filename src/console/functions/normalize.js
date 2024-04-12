export const normalize = (inputString) => {
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

  string = string
    .trim()
    .replace(/[áéíóúàèìòùâêîôûãõñç]/g, function (matched) {
      return accentsMap[matched];
    })
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(
      /(?:to |the |a |an |de |para |á |o |um |uma )/g,
      "",
    )
    .replace(/ /g, "")
    .replace(/nt/g, "not");
  // console.log(string);
  return string;
};
