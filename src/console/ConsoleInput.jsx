import { StyleSheet, TextInput, View } from "react-native";
import Timer from "./Timer";
import colors from "../utils/colors";

const ConsoleInput = (props) => {
  const handleKeyPress = () => {
    if (props.onSubmitEditing) {
      props.onSubmitEditing();
    }
  };

  return (
    <View
      style={[
        styles.formView,
        { borderColor: props.color },
      ]}
    >
      {props.timer ? (
        <Timer
          onComplete={props.onComplete}
          isPlaying={props.isPlaying}
          color={props.color}
        />
      ) : null}
      <TextInput
        {...props}
        placeholderTextColor={colors.LIGHTRED}
        autoFocus={true}
        blurOnSubmit={false}
        enterKeyHint="enter"
        autoCapitalize={"none"}
        selectionColor={colors.CONTRAST}
        style={[styles.input, { color: props.color }]}
        onSubmitEditing={handleKeyPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formView: {
    width: "100%",
    borderWidth: 2,
    backgroundColor: colors.SECONDARY,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  input: {
    width: "100%",
    height: 70,
    padding: 10,
    textAlign: "center",
    fontSize: 40,
  },
});

export default ConsoleInput;
