import { useSelector } from "react-redux";
import {
  Container,
  IconContainer,
  InfoContainerView,
  Padding,
  Rating,
  RowContainer,
  Title,
} from "../components/WordCard/StyledComponents";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { Entypo } from "@expo/vector-icons";
import useAddNewWord from "@src/hooks/collectionHooks/useAddNewWord";

const DictionaryLookupCard = ({ dictEntry }) => {
  const { target, rating, _id: id } = dictEntry;
  const { colorScheme, golden } =
    useSelector(settingsState);
  const { CONTRAST, SECONDARY } = colors[colorScheme];

  const scale = 30;
  const fontSize =
    target.length > 10
      ? (scale * 10) / (10 + (target.length - 10) * 0.7)
      : scale;

  const addNewWord = useAddNewWord();
  const addWord = () => {
    addNewWord(id);
  };

  return (
    <Padding>
      <Container
        color={CONTRAST[golden]}
        backgroundColor={SECONDARY}
        style={{ height: 50 }}
      >
        <InfoContainerView>
          <RowContainer>
            <Title
              color={CONTRAST[golden]}
              fontSize={fontSize}
            >
              {target}
            </Title>
            <Rating color={CONTRAST[golden]}>
              {Math.round(rating)}
            </Rating>
          </RowContainer>
        </InfoContainerView>
        <IconContainer
          onPress={addWord}
          style={{ width: 30 }}
        >
          <Entypo
            name="plus"
            size={24}
            color={CONTRAST[golden]}
          />
        </IconContainer>
      </Container>
    </Padding>
  );
};

export default DictionaryLookupCard;
