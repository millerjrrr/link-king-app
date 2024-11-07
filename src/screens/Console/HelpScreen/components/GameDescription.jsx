import { TouchableOpacity, Linking } from "react-native";
import DescriptionWrapper from "./DescriptionWrapper";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import useCatchAsync from "@src/hooks/useCatchAsync";

const GameDescription = () => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  const catchAsync = useCatchAsync();

  const onPress = catchAsync(async () => {
    const url =
      "https://www.youtube.com/channel/UCtvz3tIHITft0MaJVSvy6Jg";
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      throw new Error("Cannot open URL");
    }
  });

  return (
    <DescriptionWrapper {...{ name: "gameDescription" }}>
      {appLang === "pt" ? (
        <TouchableOpacity {...{ onPress }}>
          <AntDesign
            {...{ name: "youtube", size: 96, color }}
          />
        </TouchableOpacity>
      ) : null}
    </DescriptionWrapper>
  );
};

export default GameDescription;
