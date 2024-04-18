import { Text, StyleSheet, Platform } from "react-native";

const AppText = (props) => {
  return (
    <Text style={[props.style, styles.font]}>AppText</Text>
  );
};

const styles = StyleSheet.create({
  font: {
    fontFamily: Platform.select({
      ios: "font for ios",
      android: "font for android",
      default: "default font",
    }),
  },
});

export default AppText;
