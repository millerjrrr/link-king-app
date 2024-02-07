import {
  Platform,
  Text,
  View,
  StyleSheet,
} from "react-native";
import InnerTabBackground from "../components/InnerTabBackground";
import colors from "../utils/colors";
import React from "react";
import SwipeView from "../statistics/SwipeView";
import Levels from "../statistics/Levels";

const Stats = () => {
  const levelbreakdown = [
    {
      frequency: 14,
      level: 1,
    },
    {
      frequency: 6,
      level: 2,
    },
    {
      frequency: 9,
      level: 3,
    },
    {
      frequency: 6,
      level: 4,
    },
  ];

  return (
    <InnerTabBackground heading="Stats">
      <SwipeView>
        <View style={[styles.container, styles.commonProp]}>
          <Text style={{ color: colors.CONTRAST }}>1</Text>
        </View>
        <View style={[styles.container, styles.commonProp]}>
          <Text style={{ color: colors.CONTRAST }}>2</Text>
        </View>
        <View style={[styles.container, styles.commonProp]}>
          <Levels lbd={levelbreakdown} />
        </View>
      </SwipeView>
    </InnerTabBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.PRIMARY,
    shadowColor: colors.CONTRAST,
  },
  ...Platform.select({
    ios: {
      commonProp: {
        shadowOffset: {
          // width: 5,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
    },
    android: {
      commonProp: {
        elevation: 10,
      },
    },
  }),
});

export default Stats;
