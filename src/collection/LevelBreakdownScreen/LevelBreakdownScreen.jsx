import { Text, View, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import { getStatsState } from "../../store/stats";
import { fetchStatsInfo } from "../functions/fetchStatsInfo";
import { useEffect } from "react";
import Histogram from "./Histogram";
import Loader from "../../ui/Loader";
import PopUpContainer from "../../components/PopUpContainer";

const Levels = () => {
  const { golden } = useSelector(getConsoleState);
  const { levelBreakdown, busy } =
    useSelector(getStatsState);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchStatsInfo(dispatch);
  }, []);

  return (
    <PopUpContainer>
      {busy ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <Text
            style={[
              styles.title,
              { color: colors.CONTRAST[golden] },
            ]}
          >
            Levels Breakdown
          </Text>
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
  title: {
    fontSize: 30,
    marginTop: 20,
    textAlign: "center",
  },
});

export default Levels;
