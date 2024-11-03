import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import colors from "@assets/themes/colors";
import { getSettingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import {
  Container,
  OptionContainer,
  SubTitle,
  Title,
} from "./StyledComponents";
import { useNavigation } from "@react-navigation/native";
import FlagImage from "@src/components/Graphics/FlagImage";

const ManageAccountMenuItem = ({
  first,
  heading,
  data,
  iconName,
  targetScreen,
}) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const backgroundColor = colors[colorScheme].PRIMARY;
  const color = colors[colorScheme].CONTRAST[golden];

  const title =
    appTextSource(appLang).options.manageAccount[heading];

  const navigation = useNavigation();

  const onPress = !first
    ? () => navigation.navigate(targetScreen)
    : null;

  return (
    <Container
      {...{
        onPress,
        backgroundColor,
        borderColor: color,
        borderTopWidth: first ? 0 : 1,
      }}
    >
      <OptionContainer>
        <Title {...{ color }}>{title}</Title>
        <SubTitle {...{ color }}>{data}</SubTitle>
      </OptionContainer>
      {iconName ? (
        iconName === "flag" ? (
          <FlagImage {...{ flag1: appLang, scale: 1.1 }} />
        ) : (
          <MaterialCommunityIcons
            {...{
              name: iconName,
              size: 48,
              color,
            }}
          />
        )
      ) : null}
    </Container>
  );
};

export default ManageAccountMenuItem;
