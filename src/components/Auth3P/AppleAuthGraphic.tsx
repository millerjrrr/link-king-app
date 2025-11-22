import React from "react";
import { View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import appShadow from "@src/utils/appShadow";
import useColors from "@src/hooks/utilityHooks/useColors";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const AppleAuthGraphic: React.FC<{
  onPress: () => void;
}> = ({ onPress }) => {
  const { PRIMARY } = useColors();

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: base * 10,
      }}
    >
      <View
        style={{
          backgroundColor: PRIMARY,
          borderRadius: base * 10,
          ...appShadow("white"),
        }}
      >
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={
            AppleAuthentication
              .AppleAuthenticationButtonType.CONTINUE
          }
          buttonStyle={
            AppleAuthentication
              .AppleAuthenticationButtonStyle.BLACK
          } // Change to WHITE if needed
          cornerRadius={base * 10}
          style={{
            width: base * 250, // Recommended width for mobile
            height: base * 50, // Apple recommends at least 44pt
          }}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default AppleAuthGraphic;
