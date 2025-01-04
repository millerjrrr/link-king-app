import useColors from "@src/hooks/useColors";
import appShadow from "@src/utils/appShadow";
import React, { ReactNode } from "react";
import { View } from "react-native";

const AnnouncementContainer: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { SECONDARY, PRIMARY, CONTRAST } = useColors();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: SECONDARY,
        padding: 5,
        paddingVertical: 50,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: PRIMARY,
          borderRadius: 50,
          ...appShadow(CONTRAST, 10),
        }}
      >
        <View
          style={{
            flex: 1,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: PRIMARY,
            borderRadius: 50,
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

export default AnnouncementContainer;
