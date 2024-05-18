import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BusyWrapper from "../../ui/Loader/BusyWrapper";
import PopUpContainer from "../../components/containers/PopUpContainer";
import BloodRedCover from "../../ui/BloodRedCover";
import WordCard from "../WordCard";
import ResponseInformation from "./ResponseInformation";
import NoticeAndFlagButton from "./NoticeAndFlagButton";
import { flagAndDeleteTicket } from "../../utils/flagAndDeleteTicket";
import { View } from "react-native";
import appTextSource from "../../utils/appTextSource";
import { getSettingsState } from "../../store/settings";

const DeleteScreen = ({ route }) => {
  const { ticket } = route.params;
  const { appLang } = useSelector(getSettingsState);

  // ...loader management...
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [coverZIndex, setCoverZIndex] = useState(1);
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
    appTextSource[appLang].collection.deleteScreen;

  return (
    <PopUpContainer {...{ heading }}>
      <BloodRedCover {...{ elapsedTime, coverZIndex }} />
      <BusyWrapper {...{ busy, size: 96 }}>
        <View style={{ width: "100%", padding: 15 }}>
          <WordCard ticket={ticket} />
          {pressed ? (
            <ResponseInformation {...{ status }} />
          ) : null}
        </View>
        {!pressed ? (
          <NoticeAndFlagButton
            {...{
              completeFunction,
              setElapsedTime,
              setCoverZIndex,
            }}
          />
        ) : null}
      </BusyWrapper>
    </PopUpContainer>
  );
};

export default DeleteScreen;
