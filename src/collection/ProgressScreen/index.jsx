import { useDispatch, useSelector } from "react-redux";
import { getStatsState } from "@src/store/stats";
import { useEffect, useRef } from "react";
import { fetchStatsInfo } from "../functions/fetchStatsInfo";
import StatsPanel from "./StatsPanel";
import BusyWrapper from "../../components/Loader/BusyWrapper";
import {
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import LinkKingIcon from "./LinkKingIcon";
import RatingCircle from "./RatingCircle";
import FlagBookImage from "./FlagBookImage";
import BackButton from "../../components/Buttons/BackButton";
import ShareButton from "./ShareButton";
import CongratsAndName from "./CongratsAndName";
import ViewShot from "react-native-view-shot";

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

  const statsPanelRef = useRef();

  return (
    <BusyWrapper {...{ busy }}>
      <BackButton />
      <ShareButton shareRef={statsPanelRef} />
      <ViewShot
        {...{
          ref: statsPanelRef,
          style: { flex: 1, width: "100%" },
        }}
      >
        <StatsPanel>
          <LinkKingIcon />
          <FlagBookImage />
          <CongratsAndName />
          <RatingCircle />
        </StatsPanel>
      </ViewShot>
    </BusyWrapper>
  );
};

export default ProgressScreen;
