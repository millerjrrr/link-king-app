import {
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import StatusBarFiller from "../StatusBarFiller";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import { useNavigation } from "@react-navigation/native";

const FlagBook = ({ noBook, padding }) => {
  const { dictionary } = useSelector(getConsoleState);
  const source =
    dictionary === "Brazil"
      ? require("../../assets/Brazil.png")
      : require("../../assets/Spanish.png");

  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("DictionarySelectionScreen");
  };

  return noBook ? null : (
    <TouchableOpacity
      {...{
        onPress,
        style: [
          styles.container,
          { paddingVertical: padding ? 5 : 15 },
        ],
      }}
    >
      {padding ? <StatusBarFiller /> : null}
      <Image
        {...{
          source,
          resizeMode: "contain",
          style: {
            marginTop: 10,
            height: 30,
            width: 48,
          },
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});

export default FlagBook;
