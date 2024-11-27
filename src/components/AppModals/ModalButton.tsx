import {
  ButtonContainer,
  ButtonText,
} from "./StyledCompontents";

interface Props {
  title: string;
  color: string;
  size: number;
  onPress: () => void;
}

const ModalButton = (props: Props) => {
  const { title, color, size, onPress } = props;
  return (
    <ButtonContainer onPress={onPress} color={color}>
      <ButtonText color={color} size={size}>
        {title}
      </ButtonText>
    </ButtonContainer>
  );
};

export default ModalButton;
