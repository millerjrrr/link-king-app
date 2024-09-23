import styled from "styled-components";
import AppText from "../../../../ui/AppText";
import { TouchableOpacity } from "react-native";
import FlagImage from "../../../../ui/Graphics/FlagImage";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../../../../store/settings";
import { updateNotification } from "../../../../store/notification";
import appTextSource from "../../../../utils/appTextSource";
import colors from "../../../../utils/colors";
import appShadow from "../../../../utils/appShadow";

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  margin: 10px 25px;
  border-radius: 15px;
  padding: 10px;
  background-color: ${(props) => props.backgroundColor};
  shadow-color: ${(props) => props.color};
  border-color: ${(props) => props.color};
`;

const LanguageCard = ({ code, native }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { appLang, colorScheme, golden } = useSelector(
    getSettingsState,
  );

  const color = colors[colorScheme].SECONDARY;
  const shadowColor = colors[colorScheme].CONTRAST[golden];

  const { languageAlreadySelected } =
    appTextSource(appLang).options.manageAccount;

  const onPress = () =>
    appLang === code
      ? dispatch(
          updateNotification({
            message: languageAlreadySelected,
            type: "info",
          }),
        )
      : navigation.navigate("ChangeHomeLanguageScreen", {
          code,
        });

  return (
    <Container
      {...{
        backgroundColor: color,
        color,
        style: { shadowColor, ...appShadow(1) },
        onPress,
      }}
    >
      <FlagImage {...{ flag1: code }} />
      <View {...{ style: { width: 10 } }} />
      <AppText>{native}</AppText>
    </Container>
  );
};

export default LanguageCard;
