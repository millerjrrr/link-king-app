import screenDimensions from "@src/utils/screenDimensions";
const { height, width } = screenDimensions();
import { ReactNode } from "react";
import {
  Dimensions,
  Image,
  Platform,
  View,
} from "react-native";
declare function require(path: string): any;

const AdaptiveAppContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const borderRadius = height * 0.075;

  //run npx expo export --platform web to export
  const { width: vw, height: vh } =
    Dimensions.get("window");

  return Platform.OS === "web" ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          position: "relative",
          display: "flex",
          overflow: "hidden",
          height: vh,
          width: 0.5 * vh,
        }}
      >
        <Image
          source={require("@assets/img/iPhone_Static.png")}
          style={{
            position: "absolute",
            zIndex: 1,
            height: vh,
            width: 0.5 * vh,
          }}
        />
        <View
          style={{
            zIndex: 2,
            display: "flex",
            flex: 1,
            borderRadius,
            overflow: "hidden",
            margin: "7.5%",
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
