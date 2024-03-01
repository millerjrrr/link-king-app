import { Image, StyleSheet } from "react-native";

const LinkKingIcon = () => {
  return (
    <Image
      source={require("../../assets/link-king-header-logo.png")}
      resizeMode="contain"
      style={{
        height: 60,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default LinkKingIcon;
