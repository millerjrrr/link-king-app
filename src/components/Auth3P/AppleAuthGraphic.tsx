import React from "react";
import { View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import appShadow from "@src/utils/appShadow";
import useColors from "@src/hooks/useColors";

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
        marginVertical: 10,
      }}
    >
      <View
        style={{
          backgroundColor: PRIMARY,
          borderRadius: 10,
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
          cornerRadius={10}
          style={{
            width: 250, // Recommended width for mobile
            height: 50, // Apple recommends at least 44pt
          }}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default AppleAuthGraphic;
