import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";
import InternetConnectionPage from "../screens/popUpScreens/InternetConnectionPage";
import { ReactNode } from "react";

const ConnectedWrapper: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { connection } = useSelector(authState);
  return (
    <>
      {connection !== "connected" ? (
        <InternetConnectionPage />
      ) : (
        children
      )}
    </>
  );
};

export default ConnectedWrapper;
