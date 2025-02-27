import AppText from "@src/components/AppText";
import { View } from "react-native";
import { CardContainer } from "../../HelpScreen/components/StyledComponents";
import useColors from "@src/hooks/utilityHooks/useColors";
import AppLink from "@src/components/AppLink";
import { useDispatch, useSelector } from "react-redux";
import {
  incHelpPulsing,
  settingsState,
} from "@src/store/settings";
import { updateShowSolution } from "@src/store/console";
import appTextSource from "@src/utils/appTextSource";

const UserPrompt = () => {
  const { PRIMARY, CONTRAST } = useColors();
  const { appLang } = useSelector(settingsState);
  const { promptMessage, helpText } =
    appTextSource(appLang).console;
  const dispatch = useDispatch();

  return (
    <View
      style={{
        zIndex: 1,
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingVertical: 15,
      }}
    >
      <CardContainer
        backgroundColor={PRIMARY}
        color={CONTRAST}
      >
        <AppText>{promptMessage}</AppText>
        <AppLink
          title={helpText}
          onPress={() => {
            dispatch(updateShowSolution(true));
            dispatch(incHelpPulsing());
          }}
        />
      </CardContainer>
    </View>
  );
};

export default UserPrompt;
