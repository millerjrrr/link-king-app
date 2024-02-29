import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getStatsState } from "../../store/stats";
import { fetchStatsInfo } from "../functions/fetchStatsInfo";
import { useEffect } from "react";
import Histogram from "./Histogram";
import Loader from "../../ui/Loader";
import PopUpContainer from "../../components/PopUpContainer";

const Levels = () => {
  const { levelBreakdown, busy } =
    useSelector(getStatsState);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchStatsInfo(dispatch);
  }, []);

  return (
    <PopUpContainer heading="Levels Breakdown">
      {busy ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <Histogram
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
