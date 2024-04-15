import { Image } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";

const FlagBookImage = () => {
  const { dictionary } = useSelector(getConsoleState);
  const source =
    dictionary === "Brazil"
      ? require("../../assets/Brazil.png")
      : require("../../assets/Spanish.png");
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
