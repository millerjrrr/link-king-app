import clientWithAuth from "@src/api/clientWithAuth";
import {
  updateBusyState,
  updateConsoleState,
  selectConsoleLocals,
  updateFormValue,
  updateLocals,
  restartTheTimer,
  resetConsole,
  updateShowSolution,
} from "@src/store/console";
import { speak } from "@src/utils/appSpeak";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "@src/hooks/utilityHooks/useCatchAsync";
import { updateModals } from "../../store/modals";
import useAppNotification from "../utilityHooks/useAppNotification";
import appTextSource from "../../utils/appTextSource";
import { settingsState } from "../../store/settings";

const useDeleteThisTicketAndGetNewOne = () => {
  const dispatch = useDispatch();
  const appNotification = useAppNotification();
  const { appLang } = useSelector(settingsState);

  const errorMsg =
    appTextSource(appLang).internetConnectionPage.title1;

  const catchAsync = useCatchAsync();
  const {
    options: { sound },
  } = useSelector(selectConsoleLocals);

  const deleteThisTicketAndGetNewOne = catchAsync(
    async (id: string) => {
      try {
        dispatch(
          updateLocals({
            startedThisWord: Date.now(),
            timerIsOn: true,
            busy: true,
            showSolution: false,
          }),
        );

        const { data } = await clientWithAuth.post(
          "/api/v1/console/delete-this-word-and-get-new-one",
          { ticketId: id },
        );

        if (data.status === "success") {
          const {
            gamePlay: { target, speechLang: language },
          } = data;

          dispatch(updateConsoleState({ ...data }));
          dispatch(updateFormValue(""));
          speak({ target, language, sound });
          dispatch(restartTheTimer());
          dispatch(resetConsole());
          dispatch(updateShowSolution(false));
        } else {
          dispatch(
            updateModals({
              showNewWordAddedModal: true,
              currentTabName: "Console:",
            }),
          );
        }
      } catch (err) {
        appNotification("error", errorMsg);
        dispatch(
          updateModals({
            showNewWordAddedModal: true,
            currentTabName: "Console:",
          }),
        );
      } finally {
        dispatch(updateBusyState(false));
      }
    },
  );

  return deleteThisTicketAndGetNewOne;
};

export default useDeleteThisTicketAndGetNewOne;
