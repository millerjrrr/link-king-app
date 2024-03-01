import Loader from "./Loader";

const BusyWrapper = ({ busy, size = 24, children }) => {
  return <>{busy ? <Loader size={size} /> : children}</>;
};

export default BusyWrapper;
