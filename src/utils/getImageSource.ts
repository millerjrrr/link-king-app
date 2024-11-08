const images = require.context(
  "../../assets/img/flags",
  false,
  /\.png$/,
);

const getImageSource = (name: string): string => {
  try {
    if (name && images(`./${name}.png`)) {
      return images(`./${name}.png`);
    } else {
      throw new Error();
    }
  } catch (e) {
    return images(`./smallCrown.png`);
  }
};

export default getImageSource;
