import { updateNotification } from "@src/store/notification";
import { useDispatch } from "react-redux";

const useAppNotification = () => {
  const dispatch = useDispatch();

  const appNotification = async (
    type: "error" | "success" | "info",
    message: string,
  ) => {
    dispatch(
      updateNotification({
        message,
        type,
      }),
    );
  };

  return appNotification;
};

export default useAppNotification;
