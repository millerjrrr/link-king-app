import { useSelector } from "react-redux";
import { statsState } from "@src/store/stats";
import { RefObject, useRef } from "react";
import StatsPanel from "./StatsPanel";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import LinkKingIcon from "./LinkKingIcon";
import RatingCircle from "./RatingCircle";
import FlagBookImage from "./FlagBookImage";
import BackButton from "@src/components/Buttons/BackButton";
import ShareButton from "./ShareButton";
import CongratsAndName from "./CongratsAndName";
import ViewShot from "react-native-view-shot";
import useFetchStatsInfo from "@src/hooks/collectionHooks/useFetchStatsInfo";
import BottomShadow from "../../../components/BottomShadow";

const ProgressScreen = () => {
  const { busy } = useSelector(statsState);
  const statsPanelRef = useRef<React.ComponentRef<
    typeof ViewShot
  > | null>(null);
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
        <BottomShadow />
      </ViewShot>
    </BusyWrapper>
  );
};

export default ProgressScreen;
