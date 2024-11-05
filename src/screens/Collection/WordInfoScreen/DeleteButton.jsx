import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import RedSafetyButton from "@src/components/Buttons/RedSafetyButton";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";
import { View } from "react-native";
import useFlagAndDeleteTicket from "@src/hooks/collectionHooks/useFlagAndDeleteTicket";

const DeleteButton = ({ ticketId }) => {
  const { colorScheme, appLang } =
    useSelector(settingsState);
  const { description, buttonTitle } =
    appTextSource(appLang).collection.wordInfoScreen;

  const flagAndDeleteTicket = useFlagAndDeleteTicket();

  completeFunction = () => {
    flagAndDeleteTicket(ticketId);
  };

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
          completeFunction={completeFunction}
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

export default DeleteButton;
