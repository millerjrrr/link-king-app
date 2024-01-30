import {
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import colors from "../utils/colors";
import CircleUI from "../ui/CircleUI";

const AuthFormContainer = ({
  children,
  heading,
  subHeading,
}) => {
  return (
    <View style={styles.container}>
      <CircleUI position="top-left" size="200" />
      <CircleUI position="top-right" size="100" />
      <CircleUI position="bottom-left" size="100" />
      <CircleUI position="bottom-right" size="200" />
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/link-king-header-logo.png")}
          resizeMode="contain"
          style={{ width: "100%" }}
        />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  heading: {
    color: colors.SECONDARY,
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 5,
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
