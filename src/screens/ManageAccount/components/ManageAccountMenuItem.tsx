import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import {
  Container,
  OptionContainer,
  SubTitle,
  Title,
} from "./StyledComponents";
import { useNavigation } from "@react-navigation/native";
import FlagImage from "@src/components/Graphics/FlagImage";
import useColors from "@src/hooks/utilityHooks/useColors";
import { ComponentProps } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ManageAccountStackParamList } from "@src/types/navigationTypes";
import en from "@assets/text/en";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

type MaterialCommunityIconsName = ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

type ManageAccountHeading =
  keyof typeof en.options.manageAccount;

interface ManageAccountMenuItemProps {
  first: boolean;
  heading: ManageAccountHeading;
  data: string;
  iconName: MaterialCommunityIconsName;
  targetScreen: keyof ManageAccountStackParamList;
}

const ManageAccountMenuItem: React.FC<
  ManageAccountMenuItemProps
> = ({ first, heading, data, iconName, targetScreen }) => {
  const { appLang } = useSelector(settingsState);
  const { CONTRAST } = useColors();

  const title =
    appTextSource(appLang).options.manageAccount[heading];

  const navigation =
    useNavigation<
      StackNavigationProp<ManageAccountStackParamList>
    >();

  const goToTargetScreen = !first
    ? () => navigation.navigate(targetScreen)
    : () => {};

  return (
    <Container
      onPress={goToTargetScreen}
      style={{
        borderColor: CONTRAST,
        borderTopWidth: first ? 0 : base * 1,
      }}
    >
      <OptionContainer>
        <Title>{title as string}</Title>
        <SubTitle>{data}</SubTitle>
      </OptionContainer>
      {iconName ? (
        iconName === "flag" ? (
          <FlagImage flag1={appLang} scale={1.1} />
        ) : (
          <MaterialCommunityIcons
            name={iconName}
            size={base * 48}
            color={CONTRAST}
          />
        )
      ) : null}
    </Container>
  );
};

export default ManageAccountMenuItem;
