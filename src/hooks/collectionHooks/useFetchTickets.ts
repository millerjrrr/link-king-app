import clientWithAuth from "@src/api/clientWithAuth";
import {
  collectionState,
  updateAllDataLoaded,
  updateBusy,
  updatePage,
  updateResults,
  updateTickets,
} from "@src/store/collection";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "@src/hooks/useCatchAsync";
import { semiNormalize } from "@src/utils/semiNormalize";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import useDebounce from "./useDebounce";

const useFetchTickets = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const catchAsync = useCatchAsync();
  const { searchKeyword, tickets, page } =
    useSelector(collectionState);

  const debouncedSearchKeyword = useDebounce(
    searchKeyword,
    300,
  );

  const fetchTickets = catchAsync(
    async (keyword: string, page: number) => {
      // console.log("# Fetching Tickets");
      try {
        if (page === 1) dispatch(updateBusy(true));
        const normWord = semiNormalize(keyword);
        const { data } = await clientWithAuth.get(
          `/api/v1/collection/tickets?page=${page}&search=${normWord}&limit=20`,
        );
        dispatch(
          updateTickets(
            page === 1
              ? data.data.tickets
              : [...tickets, ...data.data.tickets],
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
        fetchTickets("", 1);
      },
    );
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (page > 1) fetchTickets(searchKeyword, page);
  }, [page]);

  useEffect(() => {
    dispatch(updateBusy(true));
    dispatch(updatePage(1));
  }, [searchKeyword]);

  useEffect(() => {
    fetchTickets(debouncedSearchKeyword, 1);
  }, [debouncedSearchKeyword]);
};

export default useFetchTickets;
