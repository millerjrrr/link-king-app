import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";
import InternetConnectionPage from "../screens/popUpScreens/InternetConnectionPage";

const ConnectedWrapper = ({ children }) => {
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
