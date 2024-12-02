import { useSelector } from "react-redux";
import { statsState } from "@src/store/stats";
import LevelHistogram from "./LevelHistogram";
import PopUpContainer from "@src/components/Containers/PopUpContainer";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";
import StatsContainer from "./StatsContainer";
import useFetchStatsInfo from "@src/hooks/collectionHooks/useFetchStatsInfo";
import { View } from "react-native";
import BusyWrapper from "@src/components/Loader/BusyWrapper";

const StatsScreen = () => {
  const { levelBreakdown, busy } = useSelector(statsState);
  const { appLang } = useSelector(settingsState);

  useFetchStatsInfo();

  const showHist = levelBreakdown.length > 2;

  const { heading, description } =
    appTextSource(appLang).collection.statistics;

  return (
    <PopUpContainer {...{ heading }}>
      <BusyWrapper busy={busy} size={100}>
        <View style={{ width: "100%", padding: 15 }}>
          {showHist ? (
            <LevelHistogram
              lbd={levelBreakdown}
              histHeight={300}
            />
          ) : (
            <AppText {...{ style: { padding: 15 } }}>
              {description}
            </AppText>
          )}
          <StatsContainer />
        </View>
      </BusyWrapper>
    </PopUpContainer>
  );
};

export default StatsScreen;
