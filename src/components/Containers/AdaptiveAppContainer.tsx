import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { Platform, View } from "react-native";

const AdaptiveAppContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { CONTRAST, PRIMARY, SECONDARY } = colors.dark;
  const { height, width } = screenDimensions();
  const borderRadius = height * 0.0542;

  //run npx expo export --platform web to export

  return Platform.OS === "web" ? (
    <LinearGradient
      colors={["black", "grey", "white", "grey", "black"]}
      locations={[0, 0.1, 0.5, 0.9, 1]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderColor: CONTRAST[1],
          borderWidth: 3,
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
            borderWidth: 10,
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
    </LinearGradient>
  ) : (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {children}
    </View>
  );
};

export default AdaptiveAppContainer;
