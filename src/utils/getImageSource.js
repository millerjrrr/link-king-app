const images = require.context(
  "../assets",
  false,
  /\.png$/,
);

const getImageSource = (name) => {
  try {
    return images(`./${name}.png`);
  } catch (e) {
    console.warn(`Image not found: ${name}`);
    return images("./banana.png");
  }
};

export default getImageSource;
