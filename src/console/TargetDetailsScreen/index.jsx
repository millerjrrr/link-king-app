import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getConsoleState } from "../../store/console";
import PopUpContainer from "../../components/containers/PopUpContainer";
import React, { useState } from "react";
import BloodRedCover from "../../ui/BloodRedCover";
import { flagAndDeleteTicket } from "../../utils/flagAndDeleteTicket";
import BusyWrapper from "../../ui/Loader/BusyWrapper";
import TargetScreenFakeInput from "./TargetScreenFakeInput";
import Target from "./Target";
import SolutionsList from "../SolutionsList";
import ResponseInformation from "./ResponseInformation";
import NoticeAndFlagButton from "./NoticeAndFlagButton";
import appTextSource from "../../utils/appTextSource";
import { getSettingsState } from "../../store/settings";
import AcceptedAnswers from "./AcceptedAnswers";

const TargetDetailsScreen = () => {
  const { attempt } = useSelector(getConsoleState);
  const { appLang } = useSelector(getSettingsState);

  // ...loader management...
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [coverZIndex, setCoverZIndex] = useState(1);
  const [pressed, setPressed] = useState(false);

  const dispatch = useDispatch();
  const wordFlagFunction = () => {
    flagAndDeleteTicket(
      attempt.id,
      setBusy,
      setStatus,
      setPressed,
      true,
      dispatch,
    );
  };
  const { heading } =
    appTextSource[appLang].console.targetDetails;

  return (
    <PopUpContainer {...{ heading }}>
      <BloodRedCover {...{ elapsedTime, coverZIndex }} />
      <BusyWrapper {...{ busy, size: 96 }}>
        <View style={styles.container}>
          <Target />
          <TargetScreenFakeInput />
          <AcceptedAnswers />
          <SolutionsList />
        </View>
        {pressed ? (
          <ResponseInformation status={status} />
        ) : (
          <NoticeAndFlagButton
            {...{
              completeFunction: wordFlagFunction,
              setElapsedTime,
              setCoverZIndex,
            }}
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
    paddingHorizontal: 15,
    zIndex: 1,
  },
});

export default TargetDetailsScreen;
