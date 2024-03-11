import {
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  updateBusyState,
  updateConnectedState,
  updateLoggedInState,
  updateToken,
} from "../store/auth";
import TabNavigator from "./TabNavigator";
import { useEffect } from "react";
import colors from "../utils/colors";
import BusyWrapper from "../ui/Loader/BusyWrapper";
import ConnectedWrapper from "../errors/ConnectedWrapper";
import client from "../api/client";
import catchAsyncError from "../api/catchError";
import { getFromAsyncStorage } from "../utils/asyncStorage";
import { getColorsState } from "../store/colors";

const AppNavigator = () => {
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const background = colors[colorScheme].PRIMARY;
  const primary = colors[colorScheme].CONTRAST[golden];

  const { refresh } = useSelector(getAuthState);
  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background,
      primary,
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
        if (!token) {
          dispatch(updateBusyState(false));
          return;
        }
        // if there is no token stored on device exit

        const { data } = await client.get(
          "/api/users/log-in-confirmation",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            timeout: 3000,
          },
        );
        if (data.status === "success") {
          dispatch(updateBusyState(false));
          dispatch(updateToken(token));
          dispatch(updateLoggedInState(true));
        }
      } catch (error) {
        dispatch(updateBusyState(false));
        // if we are not logged in, just show the login page
        // if it times out we want to show the disconnected page
        const errorMessage = catchAsyncError(error);
        if (errorMessage.startsWith("timeout"))
          dispatch(updateConnectedState(false));
      }
    };

    fetchAuthInfo();
  }, [refresh]);

  return (
    <NavigationContainer theme={AppTheme}>
      <BusyWrapper
        {...{
          busy,
          size: 96,
        }}
      >
        <ConnectedWrapper>
          {loggedIn ? <TabNavigator /> : <AuthNavigator />}
        </ConnectedWrapper>
      </BusyWrapper>
    </NavigationContainer>
  );
};

export default AppNavigator;
