import { View, StyleSheet } from "react-native";
import { clearAsyncStorage } from "../utils/asyncStorage";
import { useDispatch } from "react-redux";
import {
  updateLoggedInState,
  updateToken,
} from "../store/auth";
import InnerTabBackground from "../components/InnerTabBackground";
import { updateNotification } from "../store/notification";
import OptionsMenuItem from "../options/OptionsMenuItem";
import colors from "../utils/colors";
// import SetDailyGoalScreen from "../options/SetDailyGoalScreen";

const Options = ({ navigation }) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  const logOut = () => {
    dispatch(updateToken(""));
    dispatch(updateLoggedInState(false));

    clearAsyncStorage();
    // navigation.navigate("SignIn");
  };

  const comingSoon = () => {
    dispatch(
      updateNotification({
        message: "...coming soon...",
        type: "error",
      }),
    );
  };

  return (
    <InnerTabBackground heading="Options">
      <View style={styles.container}>
        <OptionsMenuItem
          iconName="target-variant"
          text="Set daily goal"
          first={true}
          color={colors.INACTIVE_CONTRAST}
          onPress={comingSoon}
        />
        <OptionsMenuItem
          iconName="palette-outline"
          text="Color scheme"
          onPress={comingSoon}
          color={colors.INACTIVE_CONTRAST}
        />
        <OptionsMenuItem
          iconName="translate"
          text="Choose language pair"
          onPress={comingSoon}
          color={colors.INACTIVE_CONTRAST}
        />
        <OptionsMenuItem
          iconName="cash"
          text="Contribute"
          onPress={comingSoon}
          color={colors.INACTIVE_CONTRAST}
        />
        <OptionsMenuItem
          iconName="account-details"
          text="Edit user details"
          onPress={comingSoon}
          color={colors.INACTIVE_CONTRAST}
        />
        <OptionsMenuItem
          iconName="logout"
          text="Logout"
          onPress={logOut}
        />
      </View>
    </InnerTabBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
  },
});

export default Options;
