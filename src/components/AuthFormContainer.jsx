import {
  View,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import colors from "../utils/colors";
import CrownUI from "../ui/CrownUI";

const AuthFormContainer = ({
  children,
  heading,
  subHeading,
}) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: colors.PRIMARY }}
    >
      <CrownUI
        position="top-left"
        size="100"
        rotation="150"
        color={colors.INACTIVE_CONTRAST}
      />
      <CrownUI
        position="top-right"
        size="50"
        rotation="230"
        color={colors.INACTIVE_CONTRAST}
      />
      <CrownUI
        position="bottom-left"
        size="80"
        rotation="50"
        color={colors.INACTIVE_CONTRAST}
      />
      <CrownUI
        position="bottom-right"
        size="110"
        rotation="300"
        color={colors.INACTIVE_CONTRAST}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios" ? "padding" : undefined
        }
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Image
              source={require("../assets/link-king-header-logo.png")}
              resizeMode="contain"
              style={{
                height: 100,
                borderColor: colors.CONTRAST,
              }}
            />

            <Text style={styles.heading}>{heading}</Text>
            <Text style={styles.subHeading}>
              {subHeading}
            </Text>
          </View>
          {children}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  heading: {
    color: colors.INACTIVE_CONTRAST,
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 0,
  },
  subHeading: {
    color: colors.CONTRAST,
    fontSize: 16,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
});

export default AuthFormContainer;
