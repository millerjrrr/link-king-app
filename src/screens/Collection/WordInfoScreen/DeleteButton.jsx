import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useColors from "@src/hooks/utilityHooks/useColors";
import { useDispatch } from "react-redux";
import { updateModals } from "@src/store/modals";

const DeleteButton = () => {
  const { RED } = useColors();
  const dispatch = useDispatch();
  const onPress = () =>
    dispatch(
      updateModals({ modalShowing: "deleteWordModal" }),
    );

  return (
    <View
      style={{
        padding: 100,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <AntDesign name={"delete"} size={100} color={RED} />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteButton;
