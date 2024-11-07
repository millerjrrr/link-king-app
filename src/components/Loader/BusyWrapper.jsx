import Loader from ".";

const BusyWrapper = ({
  busy,
  size,
  color,
  backgroundColor,
  children,
}) => {
  return (
    <>
      {busy ? (
        <>
          <Loader {...{ color, size, backgroundColor }} />
        </>
      ) : (
        children
      )}
    </>
  );
};

export default BusyWrapper;
