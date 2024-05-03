import { useDispatch, useSelector } from "react-redux";
import { getStatsState } from "../../store/stats";
import { useEffect } from "react";
import { fetchStatsInfo } from "../functions/fetchStatsInfo";
import StatsPanel from "./StatsPanel";
import BusyWrapper from "../../ui/Loader/BusyWrapper";
import {
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import LinkKingIcon from "./LinkKingIcon";
import RatingCircle from "./RatingCircle";
import FlagBookImage from "./FlagBookImage";
import BackButton from "../../ui/Buttons/BackButton";
import ShareButton from "../../ui/Buttons/ShareButton";
import CongratsAndName from "./CongratsAndName";
import ChallengeFriends from "./ChallengeFriends";

const ProgressScreen = () => {
  const { busy } = useSelector(getStatsState);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchStatsInfo(dispatch);
  }, []);

  //close this screen every time we change bottom tab
  const navigation = useNavigation();
  useEffect(() => {
    const closeStackScreens = () => {
      navigation.dispatch(StackActions.popToTop());
    };
    const unsubscribe = navigation.addListener(
      "blur",
      closeStackScreens,
    );
    return unsubscribe;
  }, [navigation]);

  return (
    <BusyWrapper {...{ busy }}>
      <BackButton />
      <ShareButton />
      <StatsPanel>
        <LinkKingIcon />
        <FlagBookImage />
        <CongratsAndName />
        <RatingCircle />
        <ChallengeFriends />
      </StatsPanel>
    </BusyWrapper>
  );
};

export default ProgressScreen;
