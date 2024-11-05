import { useSelector } from "react-redux";
import { consoleState } from "@src/store/console";
import AppText from "@src/components/AppText";

const Target = () => {
  const { attempt } = useSelector(consoleState);

  //font-size management
  let fontSize = 40;
  const length = attempt.target.length;
  if (length > 12) fontSize = (fontSize * 12) / length;

  return (
    <AppText
      style={{
        fontSize,
        margin: 5,
        zIndex: 1,
      }}
    >
      {attempt.target}
    </AppText>
  );
};

export default Target;
