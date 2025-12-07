import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
const { base, height, width } = screenDimensions();
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { Dimensions, Platform, View } from "react-native";

const AdaptiveAppContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { CONTRAST } = colors.dark;
  const borderRadius = height * 0.0542;

  //run npx expo export --platform web to export
  const { width: vw, height: vh } =
    Dimensions.get("window");

  return Platform.OS === "web" && vh < 1.5 * vw ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderColor: CONTRAST[1],
          borderWidth: base * 3,
          borderRadius,
          ...appShadow(CONTRAST[0], 15),
        }}
      >
        <View
          style={{
            height,
            width,
            borderRadius,
            overflow: "hidden",
            borderWidth: base * 10,
            backgroundColor: "black",
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
