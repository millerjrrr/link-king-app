import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";
import * as SplashScreen from "expo-splash-screen";
declare function require(path: string): any;

SplashScreen.preventAutoHideAsync();

const VideoSplashScreenWrapper: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const videoRef = useRef<Video | null>(null);
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500);
  }, []);

  return showChildren ? (
    children
  ) : (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <video
          src="/assets/splash-video.mp4" // Ensure the video is inside public/assets/ for Next.js or CRA
          style={styles.video}
          autoPlay
          muted
          playsInline
          onEnded={() => setShowChildren(true)} // Trigger state change when video ends
        />
      ) : (
        <Video
          ref={videoRef}
          source={require("@assets/splash-video.mp4")} // Replace with your video file
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping={false}
          volume={0.3}
          onPlaybackStatusUpdate={(status) => {
            // Ensure we are dealing with a successful playback status
            if (
              (status as AVPlaybackStatusSuccess)
                .didJustFinish
            ) {
              setShowChildren(true);
            }
          }}
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
