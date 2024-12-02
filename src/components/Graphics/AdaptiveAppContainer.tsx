import useColors from "@src/hooks/useColors";
import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { ReactNode } from "react";
import { Platform, View } from "react-native";

const AdaptiveAppContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { CONTRAST } = useColors();
  const { height, width } = screenDimensions();
  const borderRadius = height * 0.0542;

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
          borderRadius,
        }}
      >
        <View
          style={{
            height,
            width,
            borderRadius,
            overflow: "hidden",
            borderWidth: 10,
            ...appShadow(CONTRAST, 20),
          }}
        >
          <View
            style={{
              width: 0.3 * width,
              height: 0.085 * width,
              top: 0.033 * width,
              left: "50%",
              transform: [{ translateX: -0.15 * width }],
              backgroundColor: "black",
              position: "absolute",
              zIndex: 1000,
              borderRadius: height,
            }}
          />
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
