import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getStatsState } from "../../store/stats";
import { fetchStatsInfo } from "../functions/fetchStatsInfo";
import { useEffect } from "react";
import Histogram from "./Histogram";
import PopUpContainer from "../../components/PopUpContainer";
import Loader from "../../ui/Loaders/Loader";
import {
  StackActions,
  useNavigation,
} from "@react-navigation/native";

const Levels = () => {
  const { levelBreakdown, busy } =
    useSelector(getStatsState);

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
