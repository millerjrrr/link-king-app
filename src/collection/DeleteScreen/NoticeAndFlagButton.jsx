import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import colors from "../../utils/colors";
import RedSafetyButton from "../../ui/RedSafetyButton";

const NoticeAndFlagButton = ({
  completeFunction,
  setElapsedTime,
}) => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

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
