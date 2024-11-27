import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  IconContainer,
  InfoContainer,
  Rating,
  RowContainer,
  Title,
} from "../components/WordCard/StyledComponents";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { Entypo } from "@expo/vector-icons";
import { updateModals } from "@src/store/modals";

const DictionaryLookupCard = ({ dictEntry }) => {
  const { target, rating, id } = dictEntry;
  const { colorScheme, golden } =
    useSelector(settingsState);
  const { CONTRAST, SECONDARY } = colors[colorScheme];

  const scale = 30;
  const fontSize =
    target.length > 10
      ? (scale * 10) / (10 + (target.length - 10) * 0.7)
      : scale;

  const dispatch = useDispatch();
  const addWord = () =>
    dispatch(updateModals({ showNewWordAddedModal: true }));

  return (
    <Container
      color={CONTRAST[golden]}
      backgroundColor={SECONDARY}
    >
      <InfoContainer>
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
      </InfoContainer>
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
  );
};

export default DictionaryLookupCard;
