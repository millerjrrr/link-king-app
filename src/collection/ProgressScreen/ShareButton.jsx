import { Entypo } from "@expo/vector-icons";
import {
  Share,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import { captureRef } from "react-native-view-shot";
import { errorHandler } from "../../errors/errorHandler";
import appTextSource from "../../utils/appTextSource";
import { getConsoleState } from "../../store/console";

const ShareButton = ({ shareRef }) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const { dictionary } = useSelector(getConsoleState);

  const color = colors[colorScheme].CONTRAST[golden];
  const { challenge } =
    appTextSource[appLang].collection.progressScreen;

  const message =
    challenge.A +
    dictionary +
    challenge.B +
    "\nhttps://www.linkoking.com";

  const onPress = async () => {
    try {
      const image = await captureRef(shareRef, {
        quality: 1,
      });
      await Share.share({
        url: image,
        message,
      });
    } catch (error) {
      errorHandler(error, dispatch);
    }
  };

  return (
    <>
      <TouchableOpacity
        {...{ onPress, style: styles.container }}
      >
        <Entypo
          {...{
            name: "share",
            size: 30,
            color,
          }}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
});

export default ShareButton;
