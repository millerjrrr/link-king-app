import { View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
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
  const color = colors[colorScheme].RED;

  const { textA, textB } =
    appTextSource[appLang].collection.deleteScreen;

  return (
    <>
      <View style={{ padding: 15 }}>
        <AppText>{textA}</AppText>
      </View>
      <AppText
        style={{
          color,
        }}
      >
        {textB}
      </AppText>
      <RedSafetyButton
        {...{
          setElapsedTime,
          completeFunction,
          setCoverZIndex,
          iconName: "delete",
        }}
      />
    </>
  );
};

export default NoticeAndFlagButton;
