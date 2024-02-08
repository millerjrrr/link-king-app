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
import Today from "../statistics/Today";
import Lifetime from "../statistics/Lifetime";

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

  const userGameData = {
    rating: 932.3812311575521,
    ratingPeak: 1246.5261918031106,
    ratingPlays: 62,
    dueToday: [],
    timePlayingLifetime: 3679358.187127951,
    timePlayingToday: 359000,
    stepsTakenLifetime: 1107,
    stepsTakenToday: 71,
    collectedWordsDayStart: 35,
    streakRecord: 15,
    streakToday: 7,
    streakCurrent: 0,
    sound: true,
    timer: true,
    blurred: true,
    playingMode: "ratings",
    collectedWordsToday: 0,
  };

  return (
    <InnerTabBackground heading="Stats">
      <SwipeView>
        <View style={[styles.container, styles.commonProp]}>
          <Lifetime gd={userGameData} />
        </View>
        <View style={[styles.container, styles.commonProp]}>
          <Today gd={userGameData} />
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
    // borderWidth: 1,
    // borderColor: colors.CONTRAST,
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
