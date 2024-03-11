import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import RedSafetyButton from "../../ui/RedSafetyButton";
import { getColorsState } from "../../store/colors";

const NoticeAndFlagButton = ({
  completeFunction,
  setElapsedTime,
}) => {
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <>
      <View style={{ padding: 15 }}>
        <Text
          style={{
            color,
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Are you sure you want to permanently remove this
          word from your collection?
        </Text>
      </View>
      <Text style={{ color, textAlign: "center" }}>
        Press and hold to delete
      </Text>
      <RedSafetyButton
        {...{
          setElapsedTime,
          completeFunction,
          iconName: "delete",
        }}
      />
    </>
  );
};

export default NoticeAndFlagButton;
