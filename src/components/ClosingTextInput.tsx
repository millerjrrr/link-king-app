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
import { forwardRef, useMemo } from "react";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface Props extends TextInputProps {}

const ClosingTextInput = forwardRef<TextInput, Props>(
  (props, ref) => {
    const { CONTRAST } = useColors();

    const closeKeyboard = () => {
      Keyboard.dismiss();
    };

    const inputAccessoryViewID = useMemo(
      () =>
        `doneButtonToolbar-${Math.random()
          .toString(36)
          .slice(2)}`,
      []
    );

    return Platform.OS === "ios" ? (
      <>
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View
            style={{
              padding: base * 10,
              position: "relative", // default but explicit
              height: 40,
              zIndex: 10000,
            }}
          >
            <TouchableOpacity
              onPress={closeKeyboard}
              style={{
                position: "absolute",
                top: 0,
                right: 7,
                zIndex: 10000,
              }}
            >
              <Ionicons
                name="chevron-down-circle"
                size={35}
                color={CONTRAST}
              />
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
        <TextInput
          {...props}
          ref={ref}
          inputAccessoryViewID={inputAccessoryViewID}
        />
      </>
    ) : (
      <TextInput ref={ref} {...props} />
    );
  }
);

export default ClosingTextInput;
