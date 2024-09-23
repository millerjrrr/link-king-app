const images = require.context(
  "../assets",
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
    // console.warn(
    //   `Image not found or invalid name: ${name}, using default image.`,
    // );
    return images(`./smallCrown.png`);
  }
};

export default getImageSource;
