import en from "./en";
import pt from "./pt";

const baseSource = {
  en,
  pt,
};

const appTextSource = (lang) => {
  return baseSource[lang] || baseSource.en;
};

export default appTextSource;
