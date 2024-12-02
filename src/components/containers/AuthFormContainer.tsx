import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  ViewProps,
  ScrollViewProps,
} from "react-native";
import colors from "@src/utils/colors";
import FourCrowns from "../Graphics/FourCrowns";
import LinkKingLogo from "../Graphics/LinkKingLogo";
import StatusBarFiller from "../StatusBarFiller";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "../AppText";
import BackButton from "../Buttons/BackButton";
import React, { ReactNode } from "react";
import screenDimensions from "@src/utils/screenDimensions";

interface AuthFormContainerProps {
  children: ReactNode;
  heading: string;
  subHeading?: string;
  nologo?: boolean;
  popUp?: boolean;
  back?: boolean;
  noScrollView?: boolean;
}

const AuthFormContainer: React.FC<
  AuthFormContainerProps
> = ({
  children,
  heading,
  subHeading,
  nologo,
  popUp,
  back = true,
  noScrollView,
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);

  const tintColor = colors[colorScheme].CONTRAST[golden];
  const color = colors[colorScheme].SECONDARY;
  const backgroundColor = colors[colorScheme].PRIMARY;

  const Container =
    noScrollView || Platform.OS === "web"
      ? View
      : ScrollView;
  const containerProps: ViewProps | ScrollViewProps =
    noScrollView || Platform.OS === "web"
      ? {
          style: [
            styles.container,
            {
              backgroundColor,
              alignItems: !nologo ? "center" : "flex-start",
            },
          ],
        }
      : {
          contentContainerStyle: [
            styles.container,
            {
              backgroundColor,
              alignItems: !nologo ? "center" : "flex-start",
            },
          ],
        };

  return (
    <>
      <Container {...containerProps}>
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
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height:
      screenDimensions().height +
      Platform.select({
        ios: 0,
        web: -screenDimensions().height * 0.02,
        android: (StatusBar.currentHeight || 30) + 8,
        default: 0,
      }),
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
});

export default AuthFormContainer;
