import en from "@assets/text/en";
import AppText from "@assets/text/interface";
import pt from "@assets/text/pt";

const textSource: Record<string, AppText> = {
  en,
  pt,
};

const appTextSource = (lang: string): AppText => {
  return lang in textSource
    ? textSource[lang as keyof typeof textSource]
    : textSource.en;
};

export default appTextSource;
