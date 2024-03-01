import React, { useState } from "react";
import { useDispatch } from "react-redux";
import BusyWrapper from "../../ui/Loaders/BusyWrapper";
import PopUpContainer from "../../components/PopUpContainer";
import BloodRedCover from "../../ui/BloodRedCover";
import WordCard from "../WordCard";
import ResponseInformation from "./ResponseInformation";
import NoticeAndFlagButton from "./NoticeAndFlagButton";
import { flagAndDeleteTicket } from "../../utils/flagAndDeleteTicket";

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

  return (
    <PopUpContainer heading="Delete One">
      <BloodRedCover elapsedTime={elapsedTime} />
      <BusyWrapper {...{ busy, size: 96 }}>
        <WordCard ticket={ticket} />
        {pressed ? (
          <ResponseInformation {...{ status }} />
        ) : (
          <NoticeAndFlagButton
            {...{ completeFunction, setElapsedTime }}
          />
        )}
      </BusyWrapper>
    </PopUpContainer>
  );
};

export default DeleteScreen;
