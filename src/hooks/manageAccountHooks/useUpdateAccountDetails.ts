import { useDispatch } from "react-redux";
import {
  updateBusyState,
  updateEmail,
  updateName,
} from "@src/store/auth";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import clientWithAuth from "@src/api/clientWithAuth";
import useCatchAsync from "@src/hooks/useCatchAsync";

const useUpdateAccountDetails = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const hasFetched = useRef(false);

  const updateAccountDetails = useCallback(
    catchAsync(async () => {
      console.log("# updating ManageAccount");
      if (hasFetched.current) return;
      try {
        dispatch(updateBusyState(true));
        const {
          data: { username, email },
        } = await clientWithAuth.get(
          "/api/v1/users/user-details",
        );
        dispatch(updateName(username));
        dispatch(updateEmail(email));
        hasFetched.current = true; // Set as fetched to prevent re-fetching
      } finally {
        dispatch(updateBusyState(false));
      }
    }),
    [dispatch, catchAsync],
  );

  useFocusEffect(() => {
    updateAccountDetails();
  });
};

export default useUpdateAccountDetails;
