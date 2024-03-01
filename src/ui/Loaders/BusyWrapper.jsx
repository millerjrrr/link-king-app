import Loader from "./Loader";

const BusyWrapper = ({
  busy,
  size = 24,
  color = 0,
  children,
}) => {
  return (
    <>{busy ? <Loader {...{ color, size }} /> : children}</>
  );
};

export default BusyWrapper;
