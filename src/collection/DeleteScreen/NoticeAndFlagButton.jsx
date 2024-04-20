import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import RedSafetyButton from "../../ui/Buttons/RedSafetyButton";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";

const NoticeAndFlagButton = ({
  completeFunction,
  setElapsedTime,
}) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const { textA, textB } =
    appTextSource[appLang].collection.deleteScreen;

  return (
    <>
      <View style={{ padding: 15 }}>
        <Text
          style={{
            color,
            fontSize: 25,
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
