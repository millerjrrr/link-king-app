import { Text } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
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

  const { description, buttonTitle } =
    appTextContent.english.console.targetDetails;

  return (
    <>
      <Text
        style={{
          color,
          fontSize: 25,
          marginHorizontal: 25,
          marginBottom: 15,
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
          size: 175,
        }}
      />
    </>
  );
};

export default NoticeAndFlagButton;
