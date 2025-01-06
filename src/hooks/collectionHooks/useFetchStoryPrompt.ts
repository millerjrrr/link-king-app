import clientWithAuth from "@src/api/clientWithAuth";
import useCatchAsync from "@src/hooks/useCatchAsync";
import { useDispatch } from "react-redux";
import {
  updateBusy,
  updatePromptWords,
} from "@src/store/collection";

const useFetchStoryPrompt = () => {
  const catchAsync = useCatchAsync();
  const dispatch = useDispatch();

  const fetchStoryPrompt = catchAsync(async () => {
    //console.log("# flagging and deleting a word");
    dispatch(updateBusy(true));
    try {
      const { data } = await clientWithAuth.get(
        "/api/v1/collection/send-story-prompt",
      );
      dispatch(updatePromptWords(data.tickets));
    } finally {
      dispatch(updateBusy(false));
    }
  });

  return fetchStoryPrompt;
};

export default useFetchStoryPrompt;
