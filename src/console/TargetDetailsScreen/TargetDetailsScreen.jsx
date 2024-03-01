import {
  Text,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getConsoleState } from "../../store/console";
import PopUpContainer from "../../components/PopUpContainer";
import colors from "../../utils/colors";
import React, { useState } from "react";
import RedSafetyButton from "../../ui/RedSafetyButton";
import Loader from "../../ui/Loader";
import BloodRedCover from "../../ui/BloodRedCover";
import { flagWordAndDeleteTicket } from "../functions/flagWordAndDeleteTicket";

const TargetDetailsScreen = () => {
  const { golden, attempt, lastAttempt } =
    useSelector(getConsoleState);
  let solutionString = "";
  attempt.solutions.forEach((solution, index) => {
    solutionString +=
      solution +
      (index < attempt.solutions.length - 1 ? "; " : "");
  });

  // ...loader management...
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wordFlagged, setWordFlagged] = useState(false);

  const dispatch = useDispatch();
  const wordFlagFunction = () => {
    console.log("Word Flagged!!");
    flagWordAndDeleteTicket(
      attempt.id,
      setBusy,
      setStatus,
      setWordFlagged,
      dispatch,
    );
  };

  return (
    <PopUpContainer heading="Attempt Info">
      <BloodRedCover elapsedTime={elapsedTime} />
      {busy ? (
        <Loader />
      ) : (
        <>
          <View style={styles.container}>
            <Text
              style={[
                styles.target,
                { color: colors.CONTRAST[golden] },
              ]}
            >
              {attempt.target}
            </Text>
            <View style={styles.fakeInput}>
              <Text style={styles.lastAttempt}>
                {lastAttempt
                  ? " " + lastAttempt + " "
                  : "timed out!"}
              </Text>
            </View>
            <Text
              style={{
                color: colors.CONTRAST[golden],
                fontSize: 20,
                marginTop: 10,
              }}
            >
              Accepted Answers:
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: colors.CONTRAST[golden],
                fontSize: 25,
                margin: 2,
              }}
            >
              {solutionString}
            </Text>
          </View>
          {wordFlagged ? (
            <>
              {status ? (
                <Text
                  style={{
                    color: colors.CONTRAST[golden],
                    fontSize: 25,
                    margin: 15,
                    textAlign: "center",
                  }}
                >
                  This word has been flagged for review and
                  removed from your collection. Thank you
                  for your help!
                </Text>
              ) : (
                <Text
                  style={{
                    color: colors.CONTRAST[golden],
                    fontSize: 25,
                    margin: 15,
                    textAlign: "center",
                  }}
                >
                  ...something went wrong 😣 please check
                  your internet connection and try again...
                </Text>
              )}
            </>
          ) : (
            <>
              <Text
                style={{
                  color: colors.CONTRAST[golden],
                  fontSize: 25,
                  margin: 15,
                  textAlign: "center",
                }}
              >
                Think your answer should have been accepted?
                You can flag this word for review and we
                will look into it as quickly as possible.
              </Text>
              <Text
                style={{
                  color: colors.RED,
                  fontSize: 15,

                  textAlign: "center",
                }}
              >
                Flag word and delete from collected words
              </Text>
              <RedSafetyButton
                setElapsedTime={setElapsedTime}
                completeFunction={wordFlagFunction}
                iconName={"flag"}
                size={150}
              />
            </>
          )}
        </>
      )}
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
  target: {
    fontSize: 40,
    margin: 5,
    zIndex: 1,
  },
  fakeInput: {
    zIndex: 1,
    width: "100%",
    height: 70,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 35,
    backgroundColor: colors.SECONDARY,
    color: colors.RED,
    shadowColor: colors.RED,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  lastAttempt: {
    zIndex: 1,
    color: colors.RED,
    fontSize: 40,
    textDecorationLine: "line-through",
  },
});

export default TargetDetailsScreen;
