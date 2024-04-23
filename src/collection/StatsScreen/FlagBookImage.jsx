import { Image } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import bookPictures from "../../utils/bookPictures";

const FlagBookImage = () => {
  const { dictionary } = useSelector(getConsoleState);

  const source =
    bookPictures[dictionary] ||
    bookPictures["Custom-Dictionary"];

  return (
    <Image
      {...{
        source,
        resizeMode: "contain",
        style: { height: 64 },
      }}
    />
  );
};

export default FlagBookImage;
