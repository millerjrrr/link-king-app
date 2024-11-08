import { ReactNode } from "react";
import Loader from ".";

interface BusyWrapperProps {
  busy: boolean;
  size?: number;
  color?: string;
  children: ReactNode;
}
const BusyWrapper: React.FC<BusyWrapperProps> = ({
  busy,
  size,
  color,
  children,
}) => {
  return (
    <>
      {busy ? (
        <>
          <Loader {...{ color, size }} />
        </>
      ) : (
        children
      )}
    </>
  );
};

export default BusyWrapper;
