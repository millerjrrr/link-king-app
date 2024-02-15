import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
} from "react-native";
import colors from "../utils/colors";
import { numberDateToWordStyleDate } from "./functions/numberDateToWordStyle";
import DeleteButton from "./DeleteButton";

const WordCard = ({ navigation, ticket }) => {
  const levelArray = Array.from(new Array(ticket.level));

  return (
    <View style={[styles.container, styles.commonProp]}>
      <View style={styles.infoContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.titleStyle}>
            {ticket.dicEntry.target}
          </Text>
          <Text style={styles.ratingStyle}>
            {ticket.dicEntry.rating}
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.levelStarsContainer}>
            {levelArray.map((_, index) => (
              <Entypo
                name="star"
                key={`star-${ticket.dicEntry.target}-${index}`}
                size={12}
                color={colors.CONTRAST}
              />
            ))}
          </View>
          <Text style={styles.dateStyle}>
            {numberDateToWordStyleDate(ticket.dueDate)}
          </Text>
        </View>
      </View>
      <DeleteButton
        onPress={() =>
          navigation.navigate("WordDetails", {
            ticket: ticket,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 20,
    marginBottom: 0,
    borderRadius: 15,
    padding: 5,
    backgroundColor: colors.SECONDARY,
    shadowColor: colors.CONTRAST,
  },
  ...Platform.select({
    ios: {
      commonProp: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
    },
    android: {
      commonProp: {
        elevation: 3,
      },
    },
  }),
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    paddingRight: 15,
    paddingLeft: 15,
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleStyle: {
    color: colors.CONTRAST,
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "flex-start",
  },
  ratingStyle: {
    color: colors.CONTRAST,
    fontSize: 20,
  },
  levelStarsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "left",
  },
  dateStyle: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontStyle: "italic",
  },
});

export default WordCard;
