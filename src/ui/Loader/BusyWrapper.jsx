import Loader from ".";

const BusyWrapper = ({ busy, size, color, children }) => {
  return (
    <>{busy ? <Loader {...{ color, size }} /> : children}</>
  );
};

export default BusyWrapper;
