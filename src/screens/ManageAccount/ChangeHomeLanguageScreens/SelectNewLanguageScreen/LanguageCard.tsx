import styled from "styled-components/native";
import AppText from "../../../../components/AppText";
import { TouchableOpacity } from "react-native";
import FlagImage from "../../../../components/Graphics/FlagImage";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import { updateNotification } from "@src/store/notification";
import appTextSource from "@src/utils/appTextSource";
import colors from "@src/utils/colors";
import { appShadowForStyledComponents } from "@src/utils/appShadow";
import { useCallback } from "react";
import useChangeHomeLanguageForNewUser from "@src/hooks/authHooks/useChangeHomeLanguageForNewUser";
import screenDimensions from "@src/utils/screenDimensions";
import { StackNavigationProp } from "@react-navigation/stack";
import { ManageAccountStackParamList } from "@src/types/navigationTypes";
const { base } = screenDimensions();

interface StyleProps {
  backgroundColor: `#${string}`;
  color: `#${string}`;
}
const Container = styled(TouchableOpacity)<StyleProps>`
  flex-direction: row;
  margin: ${base * 10}px ${base * 25}px;
  border-radius: ${base * 15}px;
  padding: ${base * 10}px;
  background-color: ${(props: StyleProps) =>
    props.backgroundColor};
  ${(props: StyleProps) =>
    appShadowForStyledComponents(props.color)}
`;

interface LanguageCardProps {
  code: string;
  native: string;
  unprotect: boolean;
}
const LanguageCard: React.FC<LanguageCardProps> = ({
  code,
  native,
  unprotect,
}) => {
  const navigation =
    useNavigation<
      StackNavigationProp<ManageAccountStackParamList>
    >();
  const dispatch = useDispatch();

  const { appLang, colorScheme, golden } =
    useSelector(settingsState);

  const backgroundColor = colors[colorScheme].SECONDARY;
  const color = colors[colorScheme].CONTRAST[golden];

  const { languageAlreadySelected } =
    appTextSource(appLang).options.manageAccount;

  const changeHomeLanguageForNewUser =
    useChangeHomeLanguageForNewUser();

  const onPress = useCallback(() => {
    if (appLang === code) {
      dispatch(
        updateNotification({
          message: languageAlreadySelected,
          type: "info",
        })
      );
    } else {
      if (unprotect) {
        changeHomeLanguageForNewUser({
          newLanguage: code,
        });
      } else
        navigation.navigate("Change Home Language", {
          code,
        });
    }
  }, [
    appLang,
    code,
    dispatch,
    languageAlreadySelected,
    navigation,
  ]);

  return (
    <Container
      backgroundColor={backgroundColor}
      color={color}
      onPress={onPress}
    >
      <FlagImage {...{ flag1: code }} />
      <View {...{ style: { width: 10 } }} />
      <AppText>{native}</AppText>
    </Container>
  );
};

export default LanguageCard;
