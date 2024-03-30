import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import AppNotification from "../AppNotification";
import LinkKingLogo from "../../ui/Graphics/LinkKingLogo";
import { getSettingsState } from "../../store/settings";
import HelpButton from "../../ui/HelpButton";
import FourCrowns from "../../ui/Graphics/FourCrowns";
import {
  StackActions,
  useNavigation,
} from "@react-navigation/native";

const PopUpContainer = ({ children, heading, help }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const { CONTRAST, SECONDARY } = colors[colorScheme];
  const color = CONTRAST[golden];

  //close this screen every time we change bottom tab
  const navigation = useNavigation();

  useEffect(() => {
    const closeStackScreens = () => {
      if (navigation.canGoBack())
        navigation.dispatch(StackActions.popToTop());
    };
    const unsubscribe = navigation.addListener(
      "blur",
      closeStackScreens,
    );
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FourCrowns {...{ color: SECONDARY }} />
      <HelpButton {...{ help }} />
      <View style={styles.headerContainer}>
        <LinkKingLogo
          {...{
            height: 30,
            marginTop: 10,
            tintColor: color,
          }}
        />
        <Text style={[styles.heading, { color }]}>
          {heading}
        </Text>
      </View>
      <AppNotification />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PopUpContainer;
