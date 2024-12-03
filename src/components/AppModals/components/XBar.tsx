import { AntDesign } from "@expo/vector-icons";
import { XBarContainer } from "./StyledCompontents";
import useColors from "@src/hooks/useColors";

const Xbar = ({ x }: { x: () => void }) => {
  //we do need to use x as xbar is passed to a special double modal
  const { CONTRAST } = useColors();

  return (
    <XBarContainer onPress={x}>
      <AntDesign name="close" size={24} color={CONTRAST} />
    </XBarContainer>
  );
};

export default Xbar;
