import { TouchableOpacity, Linking } from "react-native";
import DescriptionWrapper from "./DescriptionWrapper";
import { AntDesign } from "@expo/vector-icons";
import useCatchAsync from "@src/hooks/utilityHooks/useCatchAsync";
import useColors from "@src/hooks/utilityHooks/useColors";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const GameDescription = () => {
  const { CONTRAST } = useColors();

  const catchAsync = useCatchAsync();

  const goToYoutube = catchAsync(async () => {
    const url =
      "https://www.youtube.com/@linkkingapp/shorts";
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      throw new Error("Cannot open URL");
    }
  });

  return (
    <DescriptionWrapper name="gameDescription">
      <TouchableOpacity onPress={goToYoutube}>
        <AntDesign
          name="youtube"
          size={base * 96}
          color={CONTRAST}
        />
      </TouchableOpacity>
    </DescriptionWrapper>
  );
};

export default GameDescription;
