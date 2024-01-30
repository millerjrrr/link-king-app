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
import Loader from "../ui/Loader";

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.PRIMARY,
    primary: colors.CONTRAST,
  },
};

const AppNavigator = (props) => {
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
      } catch (err) {
        console.log("Auth error: ");
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
      ) : null}
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
