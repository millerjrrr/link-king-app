import { useSelector } from "react-redux";
import { statsState } from "@src/store/stats";
import { useEffect, useRef } from "react";
import StatsPanel from "./StatsPanel";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import {
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import LinkKingIcon from "./LinkKingIcon";
import RatingCircle from "./RatingCircle";
import FlagBookImage from "./FlagBookImage";
import BackButton from "@src/components/Buttons/BackButton";
import ShareButton from "./ShareButton";
import CongratsAndName from "./CongratsAndName";
import ViewShot from "react-native-view-shot";
import useFetchStatsInfo from "@src/hooks/collectionHooks/useFetchStatsInfo";

const ProgressScreen = () => {
  const { busy } = useSelector(statsState);

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

  useFetchStatsInfo();

  return (
    <BusyWrapper busy={busy} size={150}>
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
