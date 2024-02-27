import { Text, View, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import { getStatsState } from "../../store/stats";
import { useEffect } from "react";
import Loader from "../../ui/Loader";
import PopUpContainer from "../../components/PopUpContainer";
import { fetchStatsInfo } from "../functions/fetchStatsInfo";
import StatsPanel from "./StatsPanel";
import ResultsCard from "./ResultsCard";

const StatsScreen = () => {
  const { golden } = useSelector(getConsoleState);
  const { userGameData, busy } = useSelector(getStatsState);

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
