import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { ResizeMode, Video } from "expo-av";
declare function require(path: string): any;

const AppLoaderVideo = () => {
  const videoRef = useRef<Video | null>(null);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require("@assets/loader.mp4")} // Replace with your video file
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
      />
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

export default AppLoaderVideo;
