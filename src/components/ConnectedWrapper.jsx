import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";
import InternetConnectionPage from "../screens/InternetConnectionPage";

const ConnectedWrapper = ({ children }) => {
  const { connected } = useSelector(authState);
  return (
    <>
      {!connected ? <InternetConnectionPage /> : children}
    </>
  );
};

export default ConnectedWrapper;
