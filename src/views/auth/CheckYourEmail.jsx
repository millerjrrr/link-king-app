import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../utils/colors";
import AuthFormContainer from "../../components/containers/AuthFormContainer";
import { AntDesign } from "@expo/vector-icons";

const size = 200;
const CheckYourEmail = ({ navigation }) => {
  return (
    <AuthFormContainer
      heading="Verification Email Sent"
      subHeading={"Please verify your email"}
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          We've sent you an email with a verification link.
          Please check your email then return to the app to
          log in!
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
        >
          <View style={styles.loginContainer}>
            <AntDesign
              name="login"
              size={size / 2}
              color={colors.CONTRAST[0]}
            />
          </View>
        </TouchableOpacity>
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
    marginBottom: 100,
    borderRadius: 20,
    backgroundColor: colors.SECONDARY,
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: colors.CONTRAST[0],
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  text: {
    flex: 1,
    color: colors.CONTRAST[0],
    fontSize: 30,
    textAlign: "center",
    paddingVertical: 20,
  },
  loginContainer: {
    marginBottom: 30,
    borderRadius: size / 2,
    backgroundColor: colors.SECONDARY,
    height: size,
    width: size,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.CONTRAST[0],
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default CheckYourEmail;
