import {
  Container,
  IconContainer,
  InfoContainer,
  Padding,
  Rating,
  RowContainer,
  Title,
} from "../components/WordCard/StyledComponents";
import { Entypo } from "@expo/vector-icons";
import useAddNewWord from "@src/hooks/collectionHooks/useAddNewWord";
import useColors from "@src/hooks/useColors";

const DictionaryLookupCard: React.FC<{
  dictEntry: any;
}> = ({ dictEntry }) => {
  const { target, rating, _id: id } = dictEntry;

  const { CONTRAST, SECONDARY } = useColors();

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
        color={CONTRAST}
        backgroundColor={SECONDARY}
        style={{ height: 50 }}
      >
        <InfoContainer onPress={addWord}>
          <RowContainer>
            <Title color={CONTRAST} fontSize={fontSize}>
              {target}
            </Title>
            <Rating color={CONTRAST}>
              {Math.round(rating)}
            </Rating>
          </RowContainer>
        </InfoContainer>
        <IconContainer style={{ width: 30 }}>
          <Entypo
            name="plus"
            size={24}
            color={CONTRAST}
            onPress={addWord}
          />
        </IconContainer>
      </Container>
    </Padding>
  );
};

export default DictionaryLookupCard;
