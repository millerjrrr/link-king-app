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

const Levels = () => {
  const { levelBreakdown, busy } =
    useSelector(getStatsState);
  const { appLang } = useSelector(getSettingsState);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchStatsInfo(dispatch);
  }, []);

  const showHist = levelBreakdown.length > 2;

  const { heading, description } =
    appTextSource[appLang].collection.levelsBreakdown;

  return (
    <PopUpContainer {...{ heading }}>
      {showHist ? (
        busy ? (
          <Loader />
        ) : (
          <LevelHistogram
            lbd={levelBreakdown}
            histHeight={400}
          />
        )
      ) : (
        <AppText>{description}</AppText>
      )}
    </PopUpContainer>
  );
};

export default Levels;
