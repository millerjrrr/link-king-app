import { Text } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import RedSafetyButton from "../../ui/RedSafetyButton";
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

  const { description, buttonTitle } =
    appTextSource[appLang].console.targetDetails;

  return (
    <>
      <Text
        style={{
          color,
          fontSize: 25,
          marginHorizontal: 25,
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        {description}
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
        {buttonTitle}
      </Text>
      <RedSafetyButton
        {...{
          setElapsedTime,
          completeFunction,
          iconName: "flag",
          size: 150,
        }}
      />
    </>
  );
};

export default NoticeAndFlagButton;
