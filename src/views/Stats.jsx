import { Platform, View, StyleSheet } from "react-native";
import InnerTabBackground from "../components/InnerTabBackground";
import colors from "../utils/colors";
import React, { useEffect } from "react";
import SwipeView from "../statistics/SwipeView";
import Levels from "../statistics/Levels";
import Today from "../statistics/Today";
import Lifetime from "../statistics/Lifetime";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatsInfo } from "../statistics/functions/fetchStatsInfo";
import { getStatsState } from "../store/stats";
import { getConsoleState } from "../store/console";
import Loader from "../ui/Loader";
import BusyWrapper from "../components/BusyWrapper";

const Stats = ({ navigation }) => {
  const { userGameData, levelBreakdown, busy } =
    useSelector(getStatsState);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        fetchStatsInfo(dispatch);
      },
    );
    return unsubscribe;
  }, [navigation]);

  return (
    <InnerTabBackground heading="Stats">
      <BusyWrapper busy={busy}>
        <SwipeView>
          <View
            style={[styles.container, styles.commonProp]}
          >
            <Lifetime gd={userGameData} />
          </View>
          <View
            style={[styles.container, styles.commonProp]}
          >
            <Today gd={userGameData} />
          </View>
          <View
            style={[styles.container, styles.commonProp]}
          >
            <Levels lbd={levelBreakdown} />
          </View>
        </SwipeView>
      </BusyWrapper>
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
