import KeyboardIcon from "../KeyboardAndStartButton/KeyboardIcon";
import DescriptionWrapper from "./DescriptionWrapper";

const SkipButtonDescription = (props) => {
  return (
    <DescriptionWrapper {...{ name: "giveUp" }}>
      <KeyboardIcon
        {...{
          name: "skip-forward",
          size: 50,
        }}
      />
    </DescriptionWrapper>
  );
};

export default SkipButtonDescription;
