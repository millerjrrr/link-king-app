import PopUpContainer from "../../../components/containers/PopUpContainer";
import appTextSource from "../../../utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../../../store/settings";
import AppText from "../../../ui/AppText";
import {
  Linking,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../../utils/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components";
import { getAuthState } from "../../../store/auth";
import subscribeFunction from "../../../subscription/subscribeFunction";
import { useState } from "react";
import Loader from "../../../ui/Loader";
import TermsAndConditions from "../../../subscription/TermsAndConditions";

const Container = styled(View)`
  width: 100%;
  alignitems: flex-start;
  padding: 15px;
`;

const Tag = styled(AppText)`
  text-align: left;
  padding-vertical: 5px;
  font-size: 20px;
`;

const Panel = styled(View)`
  flex-direction: ${(props) => props.dir || "row"};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const StoreCombo = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const ManageSubscripitonButton = styled(TouchableOpacity)`
  width: ${(props) => {
    return !props.userIsSubscribed ? "100%" : null;
  }};
  height: 50px;
  align-items: center;
  background-color: ${(props) => props.buttonColor};
  padding-horizontal: 10px;
  padding-vertical: 5px;
  border-radius: 20px;
`;

const ManageSubscriptionScreen = () => {
  const { colorScheme, appLang, golden } = useSelector(
    getSettingsState,
  );
  const {
    heading,
    status,
    subscribed,
    notSubscribed,
    yourSubscription,
    manage,
    appStore,
    playStore,
    subscribe,
  } =
    appTextSource[appLang].options.manageAccount
      .subscriptionPage;
  const {
    PRIMARY: buttonColor,
    SECONDARY: backgroundColor,
    CONTRAST,
  } = colors[colorScheme];

  const { subscribed: userIsSubscribed } =
    useSelector(getAuthState);

  const dispatch = useDispatch();

  const [busy, setBusy] = useState(false);

  const onPress = userIsSubscribed
    ? () => {
        if (Platform.OS === "ios") {
          Linking.openURL(
            "https://apps.apple.com/account/subscriptions",
          );
        } else {
          Linking.openURL(
            "https://play.google.com/store/account/subscriptions",
          );
        }
      }
    : () => {
        subscribeFunction({ dispatch, setBusy });
      };

  return (
    <PopUpContainer {...{ heading, blockPopToTop: true }}>
      <Container>
        <Tag>{status}</Tag>
        <Panel {...{ backgroundColor }}>
          <AppText>
            {userIsSubscribed ? subscribed : notSubscribed}
          </AppText>
          <FontAwesome5
            {...{
              name: userIsSubscribed ? "check" : "times",
              size: 24,
              color: CONTRAST[(golden + 1) % 2],
            }}
          />
        </Panel>
        <Tag>{yourSubscription}</Tag>
        <Panel
          {...{
            backgroundColor,
            dir: userIsSubscribed ? "row" : "column",
          }}
        >
          <>
            {userIsSubscribed ? (
              <StoreCombo>
                <FontAwesome5
                  {...{
                    name:
                      Platform.OS === "ios"
                        ? "app-store-ios"
                        : "google-play",
                    size: 48,
                    color: CONTRAST[golden],
                    marginRight: 15,
                  }}
                />
                <AppText>
                  {Platform.OS === "ios"
                    ? appStore
                    : playStore}
                </AppText>
              </StoreCombo>
            ) : null}
            {!userIsSubscribed ? (
              <TermsAndConditions />
            ) : null}
            <ManageSubscripitonButton
              {...{
                buttonColor,
                onPress,
                userIsSubscribed,
              }}
            >
              {busy ? (
                <Loader {...{ size: 24 }} />
              ) : (
                <Tag>
                  {userIsSubscribed ? manage : subscribe}
                </Tag>
              )}
            </ManageSubscripitonButton>
          </>
        </Panel>
      </Container>
    </PopUpContainer>
  );
};
export default ManageSubscriptionScreen;