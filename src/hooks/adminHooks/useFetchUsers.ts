import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "../useCatchAsync";
import {
  adminState,
  updateAllDataLoaded,
  updateBusy,
  updatePage,
  updateResults,
  updateUsers,
} from "@src/store/admin";
import useDebounce from "../collectionHooks/useDebounce";
import clientWithAuth from "@src/api/clientWithAuth";
import { useEffect } from "react";

const useFetchUsers = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const catchAsync = useCatchAsync();
  const { searchKeyword, users, page } =
    useSelector(adminState);

  const debouncedSearchKeyword = useDebounce(
    searchKeyword,
    300,
  );

  const fetchUsers = catchAsync(
    async (keyword: string, page: number) => {
      //console.log("# Fetching Tickets");
      try {
        if (page === 1) dispatch(updateBusy(true));
        const { data } = await clientWithAuth.get(
          `/api/v1/admin/send-users?page=${page}&search=${keyword}&limit=20`,
        );
        dispatch(
          updateUsers(
            page === 1
              ? data.users
              : [...users, ...data.users],
          ),
        );
        dispatch(updateResults(data.results));
        dispatch(updateAllDataLoaded(data.returned < 20));
      } finally {
        dispatch(updateBusy(false));
      }
    },
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        fetchUsers(searchKeyword, 1);
      },
    );
    return unsubscribe;
  }, [navigation, searchKeyword]);

  useEffect(() => {
    if (page > 1) fetchUsers(searchKeyword, page);
  }, [page]);

  useEffect(() => {
    dispatch(updateBusy(true));
    dispatch(updatePage(1));
  }, [searchKeyword]);

  useEffect(() => {
    fetchUsers(debouncedSearchKeyword, 1);
  }, [debouncedSearchKeyword]);
};

export default useFetchUsers;
