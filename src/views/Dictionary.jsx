import { View, StyleSheet } from "react-native";
import AppButton from "../ui/AppButton";
import { clearAsyncStorage } from "../utils/asyncStorage";
import { useDispatch } from "react-redux";
import {
  updateLoggedInState,
  updateToken,
} from "../store/auth";
// import { useNavigation } from "@react-navigation/native";

const Dictionary = (props) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  const onPress = () => {
    dispatch(updateToken(""));
    dispatch(updateLoggedInState(false));

    clearAsyncStorage();
    // navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <AppButton onPress={onPress} title={"Logout"} />
      </View>
      <View style={styles.container}></View>
    </View>
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

export default Dictionary;
