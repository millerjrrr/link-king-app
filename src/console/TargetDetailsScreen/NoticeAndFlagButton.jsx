import { Text } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
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
      <Text
        style={{
          color,
          fontSize: 25,
          margin: 15,
          textAlign: "center",
        }}
      >
        Think your answer should have been accepted? You can
        flag this word for review and we will look into it
        as quickly as possible.
      </Text>
      <Text
        style={{
          color: colors[colorScheme].RED,
          fontSize: 15,
          marginLeft: 30,
          marginRight: 30,
          textAlign: "center",
        }}
      >
        Press and hold to flag word and delete from
        collected words
      </Text>
      <RedSafetyButton
        {...{
          setElapsedTime,
          completeFunction,
          iconName: "flag",
          size: 175,
        }}
      />
    </>
  );
};

export default NoticeAndFlagButton;
