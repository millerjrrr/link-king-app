import { useSelector } from "react-redux";
import { getAuthState } from "../store/auth";
import InternetConnectionPage from "./InternetConnectionPage";

const ConnectedWrapper = ({ children }) => {
  const { connected } = useSelector(getAuthState);
  return (
    <>
      {!connected ? <InternetConnectionPage /> : children}
    </>
  );
};

export default ConnectedWrapper;
