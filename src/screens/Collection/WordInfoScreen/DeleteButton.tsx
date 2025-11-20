import { TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useColors from "@src/hooks/utilityHooks/useColors";
import { useDispatch } from "react-redux";
import { updateModals } from "@src/store/modals";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const DeleteButton = () => {
  const { RED } = useColors();
  const dispatch = useDispatch();
  const onPress = () =>
    dispatch(
      updateModals({ modalShowing: "deleteWordModal" })
    );

  return (
    <View
      style={{
        padding: base * 100,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <FontAwesome
          name={"trash"}
          size={100}
          color={RED}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteButton;
