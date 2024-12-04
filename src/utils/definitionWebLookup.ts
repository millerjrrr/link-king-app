import screenDimensions from "./screenDimensions";

const { width, height } = screenDimensions();

const definitionWebLookup = (
  definitionSearchWord: string,
  definitionSearchLanguage: string,
) => {
  const popUp = {
    width: width * 0.9,
    height: height * 0.7,
  };
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.outerHeight;

  const left =
    viewportWidth / 2 - popUp.width / 2 + window.screenX;
  const top =
    viewportHeight / 2 - popUp.height / 2 + window.screenY;

  window.open(
    `https://www.google.com/search?q=define+${definitionSearchWord}&hl=${definitionSearchLanguage}&theme=dark`,
    "_blank",
    `width=${popUp.width}px,height=${popUp.height}px,top=${top}px,left=${left}px`,
  );
};

export default definitionWebLookup;
