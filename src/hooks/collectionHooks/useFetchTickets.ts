import clientWithAuth from "@src/api/clientWithAuth";
import {
  collectionState,
  updateCollection,
} from "@src/store/collection";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "@src/hooks/useCatchAsync";
import { semiNormalize } from "@src/utils/semiNormalize";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import useDebounce from "./useDebounce";

const useFetchTickets = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const { searchKeyword, tickets, page } =
    useSelector(collectionState);
  const navigation = useNavigation();

  const debouncedSearchKeyword = useDebounce(
    searchKeyword,
    300,
  );

  const fetchTickets = catchAsync(
    async (keyword: string) => {
      try {
        const normWord = semiNormalize(keyword);
        const { data } = await clientWithAuth.get(
          `/api/v1/collection/tickets?page=${page}&search=${normWord}`,
        );
        dispatch(
          updateCollection({
            tickets:
              page === 1
                ? data.data.tickets
                : [...tickets, ...data.data.tickets],
            results: data.results,
            allDataLoaded: data.returned < 50,
          }),
        );
      } finally {
        dispatch(updateCollection({ busy: false }));
      }
    },
  );

  useEffect(() => {
    dispatch(updateCollection({ busy: true }));
  }, [searchKeyword]);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        fetchTickets(searchKeyword);
      },
    );
    return unsubscribe;
  }, [navigation, searchKeyword, page]);

  useEffect(() => {
    fetchTickets(debouncedSearchKeyword);
  }, [page]);

  useEffect(() => {
    // Reset page to 1 when searchKeyword changes
    if (page !== 1) {
      dispatch(updateCollection({ page: 1 }));
    } else {
      fetchTickets(debouncedSearchKeyword); // If already on page 1, fetch immediately
    }
  }, [debouncedSearchKeyword]);
};

export default useFetchTickets;
