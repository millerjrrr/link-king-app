import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { updateNotification } from "@src/store/notification";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type MaterialCommunityIconNames =
  keyof typeof MaterialCommunityIcons.glyphMap;

interface IconProps {
  name: MaterialCommunityIconNames;
  message: string;
  color: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  message,
  color,
}) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() =>
        dispatch(
          updateNotification({
            message,
            type: "info",
          }),
        )
      }
    >
      <MaterialCommunityIcons
        name={name}
        color={color}
        size={96}
      />
    </TouchableOpacity>
  );
};

export default Icon;
