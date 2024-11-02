import { useDispatch, useSelector } from "react-redux";
import { getStatsState } from "@src/store/stats";
import { fetchStatsInfo } from "@src/utils/fetchStatsInfo";
import { useEffect } from "react";
import LevelHistogram from "./LevelHistogram";
import PopUpContainer from "@src/components/containers/PopUpContainer";
import Loader from "@src/components/Loader";
import { getSettingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";
import StatsContainer from "./StatsContainer";

const StatsScreen = () => {
  const { levelBreakdown, busy } =
    useSelector(getStatsState);
  const { appLang } = useSelector(getSettingsState);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchStatsInfo(dispatch);
  }, []);

  const showHist = levelBreakdown.length > 2;

  const { heading, description } =
    appTextSource(appLang).collection.statistics;

  return (
    <PopUpContainer {...{ heading }}>
      {showHist ? (
        busy ? (
          <Loader />
        ) : (
          <LevelHistogram
            lbd={levelBreakdown}
            histHeight={300}
          />
        )
      ) : (
        <AppText {...{ style: { padding: 15 } }}>
          {description}
        </AppText>
      )}
      <StatsContainer />
    </PopUpContainer>
  );
};

export default StatsScreen;
