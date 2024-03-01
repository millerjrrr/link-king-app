import {
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateToken,
} from "../store/auth";
import TabNavigator from "./TabNavigator";
import { getFromAsyncStorage } from "../utils/asyncStorage";
import { useEffect } from "react";
import colors from "../utils/colors";
import { View, StyleSheet } from "react-native";
import { getConsoleState } from "../store/console";
import catchAsyncError from "../api/catchError";
import { updateNotification } from "../store/notification";
import Loader from "../ui/Loaders/Loader";
import BusyWrapper from "../ui/Loaders/BusyWrapper";
import ConnectedWrapper from "../errors/ConnectedWrapper";

const AppNavigator = () => {
  const { golden } = useSelector(getConsoleState);
  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.PRIMARY,
      primary: colors.CONTRAST[golden],
    },
  };
  const { loggedIn, busy } = useSelector(getAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true));
      try {
        const token =
          await getFromAsyncStorage("auth-token");
        if (!token) return;
        dispatch(updateBusyState(false));
        dispatch(updateToken(token));
        dispatch(updateLoggedInState(true));
      } catch (error) {
        dispatch(updateBusyState(false));
        errorHandler(error, dispatch);
      }
    };

    fetchAuthInfo();
  }, []);

  return (
    <NavigationContainer theme={AppTheme}>
      <BusyWrapper {...{ busy, color: "black", size: 96 }}>
        {loggedIn ? (
          <ConnectedWrapper>
            <TabNavigator />
          </ConnectedWrapper>
        ) : (
          <AuthNavigator />
        )}
      </BusyWrapper>
    </NavigationContainer>
  );
};

export default AppNavigator;
