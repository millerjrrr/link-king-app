const images = require.context(
  "../../assets/img/flags",
  false,
  /\.png$/,
);

const getImageSource = (name) => {
  try {
    if (name && images(`./${name}.png`)) {
      return images(`./${name}.png`);
    } else {
      throw new Error("Name is undefined or empty.");
    }
  } catch (e) {
    return images(`./smallCrown.png`);
  }
};

export default getImageSource;
