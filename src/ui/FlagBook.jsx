import {
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import StatusBarFiller from "./StatusBarFiller";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const FlagBook = ({ dictionarySettings, padding }) => {
  const { dictionary } = useSelector(getConsoleState);
  const source =
    dictionary === "Brazil"
      ? require("../assets/Brazil.png")
      : require("../assets/Spanish.png");

  return dictionarySettings ? (
    <>
      <TouchableOpacity
        onPress={dictionarySettings}
        style={[
          styles.container,
          { paddingVertical: padding ? 5 : 15 },
        ]}
      >
        {padding ? <StatusBarFiller /> : null}
        <Image
          {...{
            source,
            resizeMode: "contain",
            style: { width: 48, height: 48 },
          }}
        />
      </TouchableOpacity>
    </>
  ) : null;
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
