import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { refreshPage } from "@src/store/auth";
import AuthButton from "./Buttons/AuthButton";
import appTextSource from "@src/utils/appTextSource";
import { settingsState } from "@src/store/settings";

const RefreshButton = () => {
  const dispatch = useDispatch();
  const { appLang } = useSelector(settingsState);

  const buttonTitle =
    appTextSource(appLang).internetConnectionPage.refresh;

  return (
    <View style={styles.container}>
      <AuthButton
        title={buttonTitle}
        onPress={() => dispatch(refreshPage())}
      />
    </View>
  );
};

export default RefreshButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
    padding: 20,
    zIndex: 10,
  },
});
