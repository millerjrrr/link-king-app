import { updateBusyState } from "@src/store/auth";
import { updateModals } from "@src/store/modals";
import { restoreDefaultGoals } from "@src/store/settings";
import { useDispatch } from "react-redux";

const useRestoreGoalDefaults = () => {
  const dispatch = useDispatch();

  const restoreGoalDefaults = async () => {
    dispatch(updateModals({ modalShowing: "" }));
    setTimeout(() => {
      dispatch(restoreDefaultGoals());
      dispatch(updateBusyState(true));
      setTimeout(() => dispatch(updateBusyState(false)), 1);
    }, 500);
  };

  return restoreGoalDefaults;
};

export default useRestoreGoalDefaults;
