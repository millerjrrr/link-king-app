import React, { useState } from "react";
import { useDispatch } from "react-redux";
import BusyWrapper from "../../ui/Loader/BusyWrapper";
import PopUpContainer from "../../components/containers/PopUpContainer";
import BloodRedCover from "../../ui/BloodRedCover";
import WordCard from "../WordCard";
import ResponseInformation from "./ResponseInformation";
import NoticeAndFlagButton from "./NoticeAndFlagButton";
import { flagAndDeleteTicket } from "../../utils/flagAndDeleteTicket";
import { View } from "react-native";
import appTextContent from "../../utils/appTextContent";

const DeleteScreen = ({ route }) => {
  const { ticket } = route.params;

  // ...loader management...
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [pressed, setPressed] = useState(false);

  const dispatch = useDispatch();
  const completeFunction = () => {
    flagAndDeleteTicket(
      ticket._id,
      setBusy,
      setStatus,
      setPressed,
      false,
      dispatch,
    );
  };

  const { heading } =
    appTextContent.english.collection.deleteScreen;

  return (
    <PopUpContainer {...{ heading }}>
      <BloodRedCover elapsedTime={elapsedTime} />
      <BusyWrapper {...{ busy, size: 96 }}>
        <View
          style={{ width: "100%", paddingHorizontal: 15 }}
        >
          <WordCard ticket={ticket} />
          {pressed ? (
            <ResponseInformation {...{ status }} />
          ) : null}
        </View>
        {!pressed ? (
          <NoticeAndFlagButton
            {...{ completeFunction, setElapsedTime }}
          />
        ) : null}
      </BusyWrapper>
    </PopUpContainer>
  );
};

export default DeleteScreen;
