import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import WordCard from "./WordCard";
import PopUpContainer from "../components/PopUpContainer";
import colors from "../utils/colors";
import DeleteForeverButton from "./DeleteForeverButton";
import { deleteTicket } from "./functions/deleteTicket";
import Loader from "../ui/Loader";
import { useDispatch } from "react-redux";

const DeleteScreen = ({ route }) => {
  // ...loader management...
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(true);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [ticketDeleted, setTicketDeleted] = useState(false);

  const { ticket } = route.params;

  const dispatch = useDispatch();
  const deleteFunction = () => {
    deleteTicket(ticket._id, setBusy, setStatus, dispatch);
    setTicketDeleted(true);
  };

  return (
    <PopUpContainer>
      <View
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          zIndex: 2,
        }}
      >
        <View
          style={{
            backgroundColor: colors.BLOOD,
            width: `${Math.min(elapsedTime / 3, 1) * 100}%`,
            height: "100%",
            position: "absolute",
            top: 0,
            bottom: 0,
          }}
        />
      </View>
      {busy ? (
        <Loader />
      ) : (
        <>
          <WordCard ticket={ticket} />
          {ticketDeleted ? (
            <>
              {status ? (
                <Text style={styles.questionStyle}>
                  This word has been removed from your
                  collection. You will no longer see it as
                  part of your repetitions but you may see
                  it again as a new word challenge at some
                  point in the future
                </Text>
              ) : (
                <Text style={styles.questionStyle}>
                  ...something went wrong 😣 please check
                  your internet connection and try again...
                </Text>
              )}
            </>
          ) : (
            <>
              <View style={styles.questionContainer}>
                <Text style={styles.questionStyle}>
                  Are you sure you want to permanently
                  remove this word from your collection?
                </Text>
              </View>
              <Text style={styles.deleteText}>
                Press and hold to delete
              </Text>
              <DeleteForeverButton
                setElapsedTime={setElapsedTime}
                deleteFunction={deleteFunction}
              />
            </>
          )}
        </>
      )}
    </PopUpContainer>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    padding: 15,
  },
  questionStyle: {
    color: colors.CONTRAST[0],
    fontSize: 30,
    textAlign: "center",
  },
  deleteText: {
    color: colors.RED,
    textAlign: "center",
  },
});

export default DeleteScreen;
