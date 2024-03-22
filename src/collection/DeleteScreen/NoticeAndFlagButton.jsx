import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import RedSafetyButton from "../../ui/RedSafetyButton";
import { getSettingsState } from "../../store/settings";
import appTextContent from "../../utils/appTextContent";

const NoticeAndFlagButton = ({
  completeFunction,
  setElapsedTime,
}) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const { textA, textB } =
    appTextContent.english.collection.deleteScreen;

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
          {textA}
        </Text>
      </View>
      <Text
        style={{
          color: colors[colorScheme].RED,
          textAlign: "center",
        }}
      >
        {textB}
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
