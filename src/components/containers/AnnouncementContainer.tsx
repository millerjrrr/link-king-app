import useColors from "@src/hooks/utilityHooks/useColors";
import appShadow from "@src/utils/appShadow";
import React, { ReactNode } from "react";
import { View } from "react-native";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const AnnouncementContainer: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { SECONDARY, PRIMARY, CONTRAST } = useColors();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: SECONDARY,
        padding: base * 20,
        paddingVertical: base * 50,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: PRIMARY,
          borderRadius: base * 50,
          ...appShadow(CONTRAST, base * 10),
        }}
      >
        <View
          style={{
            flex: 1,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: PRIMARY,
            borderRadius: base * 50,
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

export default AnnouncementContainer;
