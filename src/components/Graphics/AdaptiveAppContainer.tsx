import useColors from "@src/hooks/useColors";
import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import { ReactNode } from "react";
import { Dimensions, Platform, View } from "react-native";

const AdaptiveAppContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { CONTRAST } = useColors();

  return Platform.OS === "web" ? (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderColor: colors.dark.CONTRAST[1],
          borderWidth: 3,
          borderRadius: 40,
        }}
      >
        <View
          style={{
            height: Dimensions.get("window").height * 0.9,
            width: Dimensions.get("window").height * 0.43,
            borderRadius: 40,
            overflow: "hidden",
            borderWidth: 10,
            ...appShadow(CONTRAST, 20),
          }}
        >
          {children}
        </View>
      </View>
    </View>
  ) : (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {children}
    </View>
  );
};

export default AdaptiveAppContainer;
