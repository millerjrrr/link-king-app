import { Platform, View, StyleSheet } from "react-native";
import InnerTabBackground from "../components/InnerTabBackground";
import colors from "../utils/colors";
import React, { useEffect, useState } from "react";
import SwipeView from "../statistics/SwipeView";
import Levels from "../statistics/Levels";
import Today from "../statistics/Today";
import Lifetime from "../statistics/Lifetime";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatsInfo } from "../statistics/functions/fetchStatsInfo";
import { getStatsState } from "../store/stats";
import BusyWrapper from "../components/BusyWrapper";
import StatsPanel from "../statistics/StatsPanel";

const Stats = ({ navigation }) => {
  // ...loader management...
  const [page, refresh] = useState(true);
  const { userGameData, levelBreakdown, busy, connected } =
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

  useEffect(() => {
    fetchStatsInfo(dispatch);
  }, [page]);

  return (
    <InnerTabBackground heading="Stats">
      <BusyWrapper
        busy={busy}
        connected={connected}
        refresh={() => refresh(!page)}
      >
        <SwipeView>
          <StatsPanel>
            <Lifetime gd={userGameData} />
          </StatsPanel>
          <StatsPanel>
            <Today gd={userGameData} />
          </StatsPanel>
          <StatsPanel>
            <Levels lbd={levelBreakdown} />
          </StatsPanel>
        </SwipeView>
      </BusyWrapper>
    </InnerTabBackground>
  );
};

export default Stats;
