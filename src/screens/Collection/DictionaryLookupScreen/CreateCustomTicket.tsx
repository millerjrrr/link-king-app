import { Entypo } from "@expo/vector-icons";
import {
  Container,
  IconContainer,
  InfoContainer,
  Padding,
} from "../components/WordCard/StyledComponents";
import AutoResizeText from "@src/components/AutoResizeText";
import useColors from "@src/hooks/utilityHooks/useColors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CollectionStackParamList } from "@src/types/navigationTypes";

const CreateCustomTicket: React.FC<{
  searchKeyword: string;
}> = ({ searchKeyword }) => {
  const { CONTRAST, PRIMARY } = useColors();
  const { appLang } = useSelector(settingsState);
  const { addCustomWord } =
    appTextSource(appLang).collection
      .dictionaryLookupScreen;

  const navigation =
    useNavigation<
      StackNavigationProp<CollectionStackParamList>
    >();

  const openCustomWordScreen = () => {
    navigation.navigate("Create Custom Ticket", {
      target: searchKeyword,
    });
  };

  return (
    <Padding>
      <Container color={CONTRAST} backgroundColor={PRIMARY}>
        <InfoContainer
          onPress={openCustomWordScreen}
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <AutoResizeText fontSize={24} numberOfLines={1}>
            {addCustomWord}
          </AutoResizeText>
        </InfoContainer>

        <IconContainer style={{ width: 30 }}>
          <Entypo
            name="plus"
            size={24}
            color={CONTRAST}
            onPress={openCustomWordScreen}
          />
        </IconContainer>
      </Container>
    </Padding>
  );
};

export default CreateCustomTicket;
