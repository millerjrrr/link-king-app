import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import colors from "../../utils/colors";
import AppNotification from "../AppNotification";
import FourCrowns from "../../ui/Graphics/FourCrowns";
import LinkKingLogo from "../../ui/Graphics/LinkKingLogo";
import StatusBarFiller from "../../ui/StatusBarFiller";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import AppText from "../../ui/AppText";
import BackButton from "../../ui/Buttons/BackButton";

const AuthFormContainer = ({
  children,
  heading,
  subHeading,
  nologo,
  back = true,
}) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );

  const tintColor = colors[colorScheme].CONTRAST[golden];
  const color = colors[colorScheme].SECONDARY;
  const backgroundColor = colors[colorScheme].PRIMARY;
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <>
        <View
          style={[
            styles.container,
            {
              backgroundColor,
              alignItems: !nologo ? "center" : "flex-start",
            },
          ]}
        >
          <StatusBarFiller />
          <AppNotification />
          {back ? <BackButton extraPadding={true} /> : null}
          <FourCrowns {...{ color }} />
          {!nologo ? (
            <LinkKingLogo {...{ tintColor }} />
          ) : (
            <View style={{ height: 60 }} />
          )}
          <AppText
            style={{
              textAlign: !nologo ? "center" : "left",
              color: tintColor,
              fontWeight: "bold",
              paddingHorizontal: 5,
            }}
          >
            {heading}
          </AppText>
          {subHeading ? (
            <AppText
              style={{
                padding: 5,
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
        </View>
      </>
    </TouchableWithoutFeedback>
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
