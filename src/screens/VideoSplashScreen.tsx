import React, {
  ReactNode,
  useEffect,
  useState,
} from "react";
import { View, StyleSheet, Platform } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useVideoPlayer, VideoView } from "expo-video";
declare function require(path: string): any;

SplashScreen.preventAutoHideAsync();

const VideoSplashScreenWrapper: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500);
  }, []);

  const videoSource = require("@assets/splash-video.mp4");
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.volume = 0.3;
    player.play();
    player.addListener("playToEnd", () =>
      setShowChildren(true),
    );
  });

  return showChildren ? (
    children
  ) : (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <video
          src="/assets/assets/splash-video.mp4"
          style={styles.video}
          autoPlay
          muted
          playsInline
          onEnded={() => setShowChildren(true)} // Trigger state change when video ends
        />
      ) : (
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});

export default VideoSplashScreenWrapper;
