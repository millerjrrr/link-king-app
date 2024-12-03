import { useSelector } from "react-redux";
import {
  ButtonContainer,
  ButtonText,
} from "./StyledCompontents";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";

const ModalButton = (props: {
  title: string;
  size: number;
  onPress: () => void;
}) => {
  const { title, size, onPress } = props;
  const { colorScheme, golden } =
    useSelector(settingsState);
  const { CONTRAST } = colors[colorScheme];

  return (
    <ButtonContainer
      onPress={onPress}
      color={CONTRAST[golden]}
    >
      <ButtonText color={CONTRAST[golden]} size={size}>
        {title}
      </ButtonText>
    </ButtonContainer>
  );
};

export default ModalButton;
