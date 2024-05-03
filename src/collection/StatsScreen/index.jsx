import { useDispatch, useSelector } from "react-redux";
import { getStatsState } from "../../store/stats";
import { fetchStatsInfo } from "../functions/fetchStatsInfo";
import { useEffect } from "react";
import LevelHistogram from "./LevelHistogram";
import PopUpContainer from "../../components/containers/PopUpContainer";
import Loader from "../../ui/Loader";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import AppText from "../../ui/AppText";
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
    appTextSource[appLang].collection.statistics;

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
        <AppText {...{ padding: 15 }}>
          {description}
        </AppText>
      )}
      <StatsContainer />
    </PopUpContainer>
  );
};

export default StatsScreen;
