import clientWithAuth from "@src/api/clientWithAuth";
import {
  updateBusyState,
  updateLevelBreakdown,
  updateUserGameData,
  updateUserName,
} from "@src/store/stats";
import useCatchAsync from "@src/hooks/useCatchAsync";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const useFetchStatsInfo = () => {
  const catchAsync = useCatchAsync();
  const dispatch = useDispatch();

  const fetchStatsInfo = catchAsync(async () => {
    // console.log("# Fetching stats info");
    dispatch(updateBusyState(true));
    try {
      const { data } = await clientWithAuth.get(
        "/api/v1/collection/statistics",
      );
      const { levelBreakdown, userGameData, username } =
        data;
      dispatch(updateLevelBreakdown(levelBreakdown));
      dispatch(updateUserGameData(userGameData));
      dispatch(updateUserName(username));
    } finally {
      dispatch(updateBusyState(false));
    }
  });

  useFocusEffect(
    useCallback(() => {
      fetchStatsInfo();
    }, []),
  );
};

export default useFetchStatsInfo;
