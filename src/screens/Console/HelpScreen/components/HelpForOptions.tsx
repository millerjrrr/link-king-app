import OptionsContainer from "../../components/OptionsContainer";
import DescriptionWrapper from "./DescriptionWrapper";

const HelpForOptions: React.FC<{
  name: "listen" | "read" | "countdown";
}> = ({ name }) => {
  const lookup = {
    listen: "time",
    read: "blurred",
    countdown: "time",
  };

  return (
    <DescriptionWrapper {...{ name }}>
      <OptionsContainer
        size={40}
        show={lookup[name] as "time" | "blurred" | "time"}
      />
    </DescriptionWrapper>
  );
};

export default HelpForOptions;
