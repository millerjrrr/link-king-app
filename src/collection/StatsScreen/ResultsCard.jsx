import { Text, View, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import StatsContainer from "./StatsContainer";
import RatingCircle from "./RatingCircle";
import { getStatsState } from "../../store/stats";
import LinkKingIcon from "./LinkKingIcon";

const ResultsCard = () => {
  const { golden } = useSelector(getConsoleState);
  const { userGameData } = useSelector(getStatsState);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <LinkKingIcon />
      <Text
        style={[
          styles.title,
          { color: colors.CONTRAST[golden] },
        ]}
      >
        Congratulations!
      </Text>
      <Text
        style={[
          styles.text,
          { color: colors.CONTRAST[golden] },
        ]}
      >
        You've collected {userGameData.collectedWords} new
        words!
      </Text>
      <Text
        style={[
          styles.text,
          {
            color: colors.GREENPROGRESS,
            marginTop: 20,
            marginBottom: 20,
          },
        ]}
      >
        Your performance rating is
      </Text>
      <RatingCircle />
      <StatsContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    margin: 5,
    textAlign: "center",
  },
});

export default ResultsCard;