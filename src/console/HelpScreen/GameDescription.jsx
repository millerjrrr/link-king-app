import { TouchableOpacity, Linking } from "react-native";
import DescriptionWrapper from "./DescriptionWrapper";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import colors from "../../utils/colors";
import { errorHandler } from "../../errors/errorHandler";

const GameDescription = () => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const dispatch = useDispatch();

  const onPress = () => {
    const url =
      "https://www.youtube.com/channel/UCtvz3tIHITft0MaJVSvy6Jg";
    Linking.canOpenURL(url)
      .then(() => {
        Linking.openURL(url);
      })
      .catch((err) => errorHandler(err, dispatch));
  };

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
