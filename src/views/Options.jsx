import { View, StyleSheet } from "react-native";
import AppButton from "../ui/AppButton";
import { clearAsyncStorage } from "../utils/asyncStorage";
import { useDispatch } from "react-redux";
import {
  updateLoggedInState,
  updateToken,
} from "../store/auth";
import InnerTabBackground from "../components/InnerTabBackground";

const Options = (props) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  const onPress = () => {
    dispatch(updateToken(""));
    dispatch(updateLoggedInState(false));

    clearAsyncStorage();
    // navigation.navigate("SignIn");
  };

  return (
    <InnerTabBackground heading="Options">
      <View style={styles.container}>
        <AppButton onPress={onPress} title={"Logout"} />
      </View>
      <View style={styles.container}></View>
    </InnerTabBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Options;