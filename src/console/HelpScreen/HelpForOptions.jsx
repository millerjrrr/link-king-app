import DescriptionWrapper from "./DescriptionWrapper";
import OptionsContainer from "../OptionsContainer";

const HelpForOptions = ({ name }) => {
  const lookup = {
    listen: 1,
    read: 2,
    countdown: 3,
  };

  return (
    <DescriptionWrapper {...{ name }}>
      <OptionsContainer
        {...{ size: 40, show: lookup[name] }}
      />
    </DescriptionWrapper>
  );
};

export default HelpForOptions;
