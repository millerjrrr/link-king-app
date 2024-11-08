import StatsIcon from "../../components/StatsContainer/StatsIcon";
import DescriptionWrapper from "./DescriptionWrapper";

const HelpForStats = ({ name }) => {
  const lookup = {
    dueToday: "target",
    steps: "foot-print",
    time: "clock-outline",
    streak: "trophy-variant",
  };

  return (
    <DescriptionWrapper {...{ name }}>
      <StatsIcon {...{ name: lookup[name], size: 50 }} />
    </DescriptionWrapper>
  );
};

export default HelpForStats;
