import colors from "@assets/themes/colors";
import { useSelector } from "react-redux";
import RedSafetyButton from "@src/components/Buttons/RedSafetyButton";
import { getSettingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";
import { View } from "react-native";

const NoticeAndFlagButton = ({
  completeFunction,
  setElapsedTime,
  setCoverZIndex,
  wrongAnswerReturned,
}) => {
  const { colorScheme, appLang } = useSelector(
    getSettingsState,
  );

  const { description, buttonTitle } = wrongAnswerReturned
    ? appTextSource(appLang).console.targetDetails
    : appTextSource(appLang).collection.wordInfoScreen;

  return (
    <>
      <AppText
        style={{
          fontSize: 20,
          textAlign: "center",
          paddingHorizontal: 15,
        }}
      >
        {description}
      </AppText>
      <View
        {...{
          style: {
            alignItems: "center",
            width: "100%",
            padding: 15,
            zIndex: 10,
          },
        }}
      >
        <RedSafetyButton
          {...{
            setElapsedTime,
            completeFunction,
            setCoverZIndex,
            iconName: wrongAnswerReturned
              ? "flag"
              : "delete",
            buttonTitle,
          }}
        />
        <AppText
          style={{
            color: colors[colorScheme].RED,
            fontSize: 15,
          }}
        >
          {buttonTitle}
        </AppText>
      </View>
    </>
  );
};

export default NoticeAndFlagButton;
