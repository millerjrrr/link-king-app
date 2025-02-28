import {
  Keyboard,
  Platform,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { InputAccessoryView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useColors from "@src/hooks/utilityHooks/useColors";
import { forwardRef } from "react";

interface Props extends TextInputProps {}

const ClosingTextInput = forwardRef<TextInput, Props>(
  (props, ref) => {
    const { CONTRAST } = useColors();

    const closeKeyboard = () => {
      Keyboard.dismiss();
    };

    const inputAccessoryViewID = "doneButtonToolbar";

    return Platform.OS === "ios" ? (
      <>
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View
            style={{
              padding: 10,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity onPress={closeKeyboard}>
              <Ionicons
                name="chevron-down-circle"
                size={30}
                color={CONTRAST}
              />
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
        <TextInput
          {...props}
          ref={ref || undefined} // Ensure ref is only passed when defined
          inputAccessoryViewID={inputAccessoryViewID}
        />
      </>
    ) : (
      <TextInput
        ref={ref || undefined} // Ensure ref is only passed when defined
        {...props}
      />
    );
  },
);

export default ClosingTextInput;
