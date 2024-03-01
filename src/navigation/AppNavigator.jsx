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
        const errorMessage = catchAsyncError(error);
        dispatch(
          updateNotification({
            message: errorMessage,
            type: "error",
          }),
        );
      } finally {
        dispatch(updateBusyState(false));
      }
    };

    fetchAuthInfo();
  }, []);

  return (
    <NavigationContainer theme={AppTheme}>
      {busy ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.OVERLAY,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <Loader />
        </View>
      ) : loggedIn ? (
        <TabNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
