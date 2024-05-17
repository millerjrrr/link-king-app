import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import colors from "../../utils/colors";
import AppNotification from "../AppNotification";
import FourCrowns from "../../ui/Graphics/FourCrowns";
import LinkKingLogo from "../../ui/Graphics/LinkKingLogo";
import StatusBarFiller from "../../ui/StatusBarFiller";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import AppText from "../../ui/AppText";

const AuthFormContainer = ({
  children,
  heading,
  subHeading,
  nologo,
}) => {
  const { colorScheme } = useSelector(getSettingsState);

  const tintColor = colors[colorScheme].CONTRAST[0];
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
    height: Dimensions.get("window").height,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
});

export default AuthFormContainer;
