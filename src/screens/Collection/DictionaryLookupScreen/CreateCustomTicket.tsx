import { Entypo } from "@expo/vector-icons";
import {
  Container,
  IconContainer,
  InfoContainer,
  Padding,
} from "../components/WordCard/StyledComponents";
import {
  AutoSizeText,
  ResizeTextMode,
} from "react-native-auto-size-text";
import useColors from "@src/hooks/useColors";
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
          <AutoSizeText
            fontSize={24}
            mode={ResizeTextMode.max_lines}
            numberOfLines={1}
            style={{ fontWeight: "bold", color: CONTRAST }}
          >
            {addCustomWord}
          </AutoSizeText>
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
