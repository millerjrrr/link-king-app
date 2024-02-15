import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import WordCard from "./WordCard";
import PopUpContainer from "../components/PopUpContainer";
import colors from "../utils/colors";
import DeleteForeverButton from "./DeleteForeverButton";

const DeleteScreen = ({ route }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [ticketDeleted, setTicketDeleted] = useState(false);

  const { ticket } = route.params;

  const deleteFunction = () => {
    console.log("deleting...", ticket._id);
    setTicketDeleted(true);
  };

  return (
    <View style={styles.container}>
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
        <WordCard ticket={ticket} />
        {ticketDeleted ? (
          <Text style={styles.questionStyle}>
            This word has been removed from your collection.
            You will no longer see it as part of your
            repetitions but you may see it again as a new
            word challenge at some point in the future
          </Text>
        ) : (
          <>
            <View style={styles.questionContainer}>
              <Text style={styles.questionStyle}>
                Are you sure you want to permanently remove
                this word from your collection?
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
      </PopUpContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  questionContainer: {
    padding: 15,
  },
  questionStyle: {
    color: colors.CONTRAST,
    fontSize: 30,
    textAlign: "center",
  },
  deleteText: {
    color: colors.RED,
    textAlign: "center",
  },
});

export default DeleteScreen;
