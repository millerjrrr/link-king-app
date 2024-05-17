import {
  View,
  StyleSheet,
  Text,
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
          <Text
            style={[
              styles.heading,
              {
                textAlign: !nologo ? "center" : "left",
                color: tintColor,
              },
            ]}
          >
            {heading}
          </Text>
          {subHeading ? (
            <Text
              style={[
                styles.subHeading,
                {
                  textAlign: !nologo ? "center" : "left",
                  color: tintColor,
                },
              ]}
            >
              {subHeading}
            </Text>
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
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
  subHeading: {
    padding: 5,
    fontSize: 16,
  },
});

export default AuthFormContainer;
