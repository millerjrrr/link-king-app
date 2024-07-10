import { useState } from "react";
import { ScrollView, View } from "react-native";
import AuthButton from "../ui/Buttons/AuthButton";
import appTextSource from "../utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import AppText from "../ui/AppText";
import AuthFormContainer from "../components/containers/AuthFormContainer";
import subscribeFunction from "./subscribeFunction";
import TermsAndConditions from "./TermsAndConditions";

const Paywall = () => {
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();

  const onPress = () =>
    subscribeFunction({ dispatch, setBusy });

  const { appLang } = useSelector(getSettingsState);
  const { heading, title, notice } =
    appTextSource[appLang].paywall;

  return (
    <AuthFormContainer {...{ heading, back: false }}>
      <ScrollView
        style={{
          padding: 5,
          paddingVertical: 15,
          flex: 1,
        }}
      >
        <AppText
          {...{
            style: { textAlign: "left", fontSize: 20 },
          }}
        >
          {notice}
        </AppText>
        <View style={{ height: 50 }} />
      </ScrollView>
      <TermsAndConditions />
      <View
        style={{
          marginBottom: 70,
          width: "100%",
        }}
      >
        <AuthButton {...{ title, busy, onPress }} />
      </View>
    </AuthFormContainer>
  );
};

export default Paywall;
