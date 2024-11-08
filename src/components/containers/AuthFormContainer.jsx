import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import colors from "@src/utils/colors";
import FourCrowns from "../Graphics/FourCrowns";
import LinkKingLogo from "../Graphics/LinkKingLogo";
import StatusBarFiller from "../StatusBarFiller";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "../AppText";
import BackButton from "../Buttons/BackButton";

const AuthFormContainer = ({
  children,
  heading,
  subHeading,
  nologo,
  popUp,
  back = true,
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);

  const tintColor = colors[colorScheme].CONTRAST[golden];
  const color = colors[colorScheme].SECONDARY;
  const backgroundColor = colors[colorScheme].PRIMARY;
  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            backgroundColor,
            alignItems: !nologo ? "center" : "flex-start",
          },
        ]}
      >
        <StatusBarFiller />
        {back ? <BackButton extraPadding={true} /> : null}
        <FourCrowns {...{ color }} />
        {!nologo ? (
          <LinkKingLogo {...{ tintColor }} />
        ) : popUp ? null : (
          <View {...{ style: { height: 60 } }} />
        )}
        <AppText
          style={{
            textAlign: !nologo ? "center" : "left",
            color: tintColor,
            fontWeight: "bold",
            paddingHorizontal: 5,
            paddingLeft: popUp ? 40 : 5,
          }}
        >
          {heading}
        </AppText>
        {subHeading ? (
          <AppText
            style={{
              padding: 5,
              paddingLeft: popUp ? 40 : 5,
              fontSize: 16,
              textAlign: !nologo ? "center" : "left",
              color: tintColor,
            }}
          >
            {subHeading}
          </AppText>
        ) : null}
        <View style={{ height: 10 }} />
        {children}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height:
      Dimensions.get("window").height +
      Platform.select({
        ios: 0,
        android: StatusBar.currentHeight + 20,
      }),
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
});

export default AuthFormContainer;
