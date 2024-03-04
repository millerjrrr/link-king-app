import {
  Text,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getConsoleState } from "../../store/console";
import PopUpContainer from "../../components/containers/PopUpContainer";
import colors from "../../utils/colors";
import React, { useState } from "react";
import RedSafetyButton from "../../ui/RedSafetyButton";
import BloodRedCover from "../../ui/BloodRedCover";
import { flagAndDeleteTicket } from "../../utils/flagAndDeleteTicket";
import BusyWrapper from "../../ui/Loader/BusyWrapper";
import TargetScreenFakeInput from "./TargetScreenFakeInput";
import Target from "./Target";
import Solutions from "./Solutions";
import ResponseInformation from "./ResponseInformation";
import NoticeAndFlagButton from "./NoticeAndFlagButton";

const TargetDetailsScreen = () => {
  const { golden, attempt, lastAttempt } =
    useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

  // ...loader management...
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [pressed, setPressed] = useState(false);

  const dispatch = useDispatch();
  const wordFlagFunction = () => {
    console.log("Word Flagged!!");
    flagAndDeleteTicket(
      attempt.id,
      setBusy,
      setStatus,
      setPressed,
      true,
      dispatch,
    );
  };

  return (
    <PopUpContainer heading="Attempt Info">
      <BloodRedCover elapsedTime={elapsedTime} />
      <BusyWrapper {...{ busy, size: 96 }}>
        <View style={styles.container}>
          <Target />
          <TargetScreenFakeInput />
          <Solutions />
        </View>
        {pressed ? (
          <ResponseInformation status={status} />
        ) : (
          <NoticeAndFlagButton
            completeFunction={wordFlagFunction}
            setElapsedTime={setElapsedTime}
          />
        )}
      </BusyWrapper>
    </PopUpContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    zIndex: 1,
  },
});

export default TargetDetailsScreen;
