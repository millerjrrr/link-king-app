import { Text, View, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import { getStatsState } from "../../store/stats";
import { useEffect } from "react";
import { fetchStatsInfo } from "../functions/fetchStatsInfo";
import StatsPanel from "./StatsPanel";
import ResultsCard from "./ResultsCard";
import Loader from "../../ui/Loaders/Loader";

const StatsScreen = () => {
  const { golden } = useSelector(getConsoleState);
  const { busy } = useSelector(getStatsState);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchStatsInfo(dispatch);
  }, []);

  return (
    <View style={styles.container}>
      {busy ? (
        <Loader />
      ) : (
        <StatsPanel>
          <Text
            style={[
              styles.title,
              { color: colors.CONTRAST[golden] },
            ]}
          >
            <ResultsCard />
          </Text>
        </StatsPanel>
      )}
    </View>
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

export default StatsScreen;
