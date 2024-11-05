import { useSelector } from "react-redux";
import { statsState } from "@src/store/stats";
import LevelHistogram from "./LevelHistogram";
import PopUpContainer from "@src/components/containers/PopUpContainer";
import Loader from "@src/components/Loader";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";
import StatsContainer from "./StatsContainer";
import useFetchStatsInfo from "@src/hooks/collectionHooks/useFetchStatsInfo";

const StatsScreen = () => {
  const { levelBreakdown, busy } = useSelector(statsState);
  const { appLang } = useSelector(settingsState);

  useFetchStatsInfo();

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
