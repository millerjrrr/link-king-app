import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import RedSafetyButton from "../../ui/Buttons/RedSafetyButton";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import AppText from "../../ui/AppText";

const NoticeAndFlagButton = ({
  completeFunction,
  setElapsedTime,
  setCoverZIndex,
}) => {
  const { colorScheme, appLang } = useSelector(
    getSettingsState,
  );

  const { description, buttonTitle } =
    appTextSource[appLang].console.targetDetails;

  return (
    <>
      <AppText
        style={{
          fontSize: 20,
          marginHorizontal: 25,
          marginBottom: 10,
        }}
      >
        {description}
      </AppText>
      <AppText
        style={{
          color: colors[colorScheme].RED,
          fontSize: 15,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        {buttonTitle}
      </AppText>
      <RedSafetyButton
        {...{
          setElapsedTime,
          completeFunction,
          setCoverZIndex,
          iconName: "flag",
          size: 150,
        }}
      />
    </>
  );
};

export default NoticeAndFlagButton;
