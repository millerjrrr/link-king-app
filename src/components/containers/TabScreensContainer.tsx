import React, { ReactNode } from "react";
import { View, StyleSheet, Platform } from "react-native";
import colors from "@src/utils/colors";
import StatusBarFiller from "../StatusBarFiller";
import { useSelector } from "react-redux";
import FourCrowns from "../Graphics/FourCrowns";
import LinkKingLogo from "../Graphics/LinkKingLogo";
import HelpButton from "../Buttons/HelpButton";
import { settingsState } from "@src/store/settings";
import FlagBook from "../Buttons/FlagBook";
import AppText from "../AppText";
import BackButton from "../Buttons/BackButton";
import BusyWrapper from "../Loader/BusyWrapper";
import { authState } from "@src/store/auth";
import BottomShadow from "../BottomShadow";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface TabScreenContainerProps {
  children: ReactNode;
  heading: string;
  help?: () => void;
  helpAnimated?: boolean;
  noBook?: boolean;
  backFunction?: () => void;
}

const TabScreenContainer: React.FC<
  TabScreenContainerProps
> = ({
  children,
  heading,
  help,
  noBook,
  backFunction,
  helpAnimated,
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const { busy } = useSelector(authState);
  const { CONTRAST, SECONDARY, PRIMARY } =
    colors[colorScheme];
  const tintColor = CONTRAST[golden];
  const color = SECONDARY;

  return (
    <>
      <BottomShadow />
      <View
        style={[
          { backgroundColor: PRIMARY },
          styles.container,
        ]}
      >
        <StatusBarFiller />
        {backFunction ? (
          <BackButton
            altFunction={backFunction}
            extraPadding
          />
        ) : null}
        <FourCrowns {...{ color }} />
        <HelpButton
          help={help}
          padding
          animated={helpAnimated}
        />
        {!noBook ? (
          <FlagBook {...{ padding: true }} />
        ) : null}
        <LinkKingLogo
          {...{
            height: base * 30,
            marginTop: 0,
            tintColor,
          }}
        />
        <AppText style={styles.heading}>{heading}</AppText>
        <BusyWrapper busy={busy} size={base * 150}>
          {children}
        </BusyWrapper>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: base * 15,
    overflow: "hidden",
  },
  heading: {
    fontSize: base * 12,
    fontWeight: "bold",
    paddingBottom: base * 5,
  },
});

export default TabScreenContainer;
