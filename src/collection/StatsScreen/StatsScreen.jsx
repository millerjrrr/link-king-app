import { Text, View, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import { getStatsState } from "../../store/stats";
import { useEffect } from "react";
import { fetchStatsInfo } from "../functions/fetchStatsInfo";
import StatsPanel from "./StatsPanel";
import ResultsCard from "./ResultsCard";
import BusyWrapper from "../../ui/Loaders/BusyWrapper";
import {
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { getAuthState } from "../../store/auth";

const StatsScreen = () => {
  const { golden } = useSelector(getConsoleState);
  const { busy } = useSelector(getStatsState);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchStatsInfo(dispatch);
  }, []);

  //close this screen every time we change bottom tab
  const navigation = useNavigation();
  useEffect(() => {
    const closeStackScreens = () => {
      if (navigation.canGoBack())
        navigation.dispatch(StackActions.popToTop());
    };
    const unsubscribe = navigation.addListener(
      "blur",
      closeStackScreens,
    );
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <BusyWrapper {...{ busy }}>
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
      </BusyWrapper>
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
