import React, { useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import SliderCircleIndicator from "./SliderCircleIndicator";

const { width } = Dimensions.get("window");

const SwipeView = ({ children }) => {
  const scrollViewRef = useRef(null);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      //   onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={styles.page}>
        {React.Children.toArray(children)[0]}
        <SliderCircleIndicator tabNumber={0} />
      </View>
      <View style={styles.page}>
        {React.Children.toArray(children)[1]}
        <SliderCircleIndicator tabNumber={1} />
      </View>
      <View style={styles.page}>
        {React.Children.toArray(children)[2]}
        <SliderCircleIndicator tabNumber={2} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    width,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SwipeView;
