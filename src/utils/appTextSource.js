import en from "@assets/text/en";
import pt from "@assets/text/pt";

const baseSource = {
  en,
  pt,
};

const appTextSource = (lang) => {
  return baseSource[lang] || baseSource.en;
};

export default appTextSource;
