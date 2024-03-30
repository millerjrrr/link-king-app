import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getStatsState } from "../../store/stats";
import { fetchStatsInfo } from "../functions/fetchStatsInfo";
import { useEffect } from "react";
import LevelHistogram from "./LevelHistogram";
import PopUpContainer from "../../components/containers/PopUpContainer";
import Loader from "../../ui/Loader";
import {
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";

const Levels = () => {
  const { levelBreakdown, busy } =
    useSelector(getStatsState);
  const { appLang } = useSelector(getSettingsState);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchStatsInfo(dispatch);
  }, []);

  const { heading } =
    appTextSource[appLang].collection.levelsBreakdown;

  return (
    <PopUpContainer {...{ heading }}>
      {busy ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <LevelHistogram
            lbd={levelBreakdown}
            histHeight={400}
          />
        </View>
      )}
    </PopUpContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default Levels;
