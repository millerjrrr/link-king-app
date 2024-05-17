import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import {
  Container,
  OptionContainer,
  SubTitle,
  Title,
} from "./StyledComponents";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

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
  const borderColor = colors[colorScheme].SECONDARY;
  const color = colors[colorScheme].CONTRAST[golden];

  const title =
    appTextSource[appLang].options.manageAccount[heading];

  const navigation = useNavigation();

  return (
    <Container
      {...{
        backgroundColor,
        borderColor,
        borderTopWidth: first ? 0 : 1,
      }}
    >
      <OptionContainer>
        <Title {...{ color }}>{title}</Title>
        <SubTitle {...{ color }}>{data}</SubTitle>
      </OptionContainer>
      {iconName ? (
        <TouchableOpacity
          onPress={() => navigation.navigate(targetScreen)}
        >
          <MaterialCommunityIcons
            {...{
              name: iconName,
              size: 48,
              color,
            }}
          />
        </TouchableOpacity>
      ) : null}
    </Container>
  );
};

export default ManageAccountMenuItem;
