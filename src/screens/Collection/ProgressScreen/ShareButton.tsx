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
import useCatchAsync from "@src/hooks/utilityHooks/useCatchAsync";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface ShareButtonProps {
  shareRef: any;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  shareRef,
}) => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);

  const color = colors[colorScheme].CONTRAST[golden];
  const { challenge } =
    appTextSource(appLang).collection.progressScreen;

  const message =
    challenge +
    " https://millerjrrr.github.io/jacobs-apps/#/link-king";

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
        onPress={onPress}
        style={styles.container}
      >
        <Entypo
          name="share"
          size={base * 30}
          color={color}
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
    paddingVertical: base * 25,
    paddingHorizontal: base * 15,
  },
});

export default ShareButton;
