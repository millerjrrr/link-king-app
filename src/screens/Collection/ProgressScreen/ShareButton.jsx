import { Entypo } from "@expo/vector-icons";
import {
  Share,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import { captureRef } from "react-native-view-shot";
import appTextSource from "@src/utils/appTextSource";
import useCatchAsync from "@src/hooks/useCatchAsync";

const ShareButton = ({ shareRef }) => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);

  const color = colors[colorScheme].CONTRAST[golden];
  const { challenge } =
    appTextSource(appLang).collection.progressScreen;

  const message = challenge + "\nhttps://www.linkoking.com";

  const catchAsync = useCatchAsync();

  const onPress = catchAsync(async () => {
    const image = await captureRef(shareRef, {
      quality: 1,
    });
    await Share.share({
      url: image,
      message,
    });
  });

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
