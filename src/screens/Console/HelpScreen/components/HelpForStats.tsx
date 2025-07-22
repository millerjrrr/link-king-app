import StatsIcon from "@screens/Console/components/StatsContainer/StatsIcon";
import DescriptionWrapper from "./DescriptionWrapper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type StatName = "dueToday" | "steps" | "time" | "streak";

const HelpForStats: React.FC<{ name: StatName }> = ({
  name,
}) => {
  const lookup: Record<StatName, string> = {
    dueToday: "target",
    steps: "foot-print",
    time: "clock-outline",
    streak: "trophy-variant",
  };

  return (
    <DescriptionWrapper {...{ name }}>
      <StatsIcon
        name={
          lookup[
            name
          ] as keyof typeof MaterialCommunityIcons.glyphMap
        }
        size={50}
      />
    </DescriptionWrapper>
  );
};

export default HelpForStats;
