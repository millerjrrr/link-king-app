import { View, StyleSheet } from "react-native";
import AppButton from "../ui/AppButton";
import { clearAsyncStorage } from "../utils/asyncStorage";
import { useDispatch } from "react-redux";
import {
  updateLoggedInState,
  updateToken,
} from "../store/auth";
import InnerTabBackground from "../components/InnerTabBackground";
import { updateNotification } from "../store/notification";
import OptionsMenuItem from "../options/OptionsMenuItem";

const Options = (props) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  const logOut = () => {
    dispatch(updateToken(""));
    dispatch(updateLoggedInState(false));

    clearAsyncStorage();
    // navigation.navigate("SignIn");
  };

  const testNotification = () => {
    console.log("test button pressed");
    dispatch(
      updateNotification({
        message: "Just a little test",
        type: "error",
      }),
    );
  };

  return (
    <InnerTabBackground heading="Options">
      <OptionsMenuItem
        iconName="logout"
        text="Logout"
        onPress={logOut}
        first={true}
      />
      <OptionsMenuItem
        iconName="logout"
        text="just a little test"
      />
      <OptionsMenuItem
        iconName="logout"
        text="just a little test"
      />
      <OptionsMenuItem
        iconName="test-tube"
        text="just a little test"
        onPress={testNotification}
      />
    </InnerTabBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Options;
