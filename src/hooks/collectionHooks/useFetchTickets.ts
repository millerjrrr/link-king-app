import clientWithAuth from "@src/api/clientWithAuth";
import {
  collectionState,
  updateCollection,
} from "@src/store/collection";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "@src/hooks/useCatchAsync";
import { semiNormalize } from "@src/utils/semiNormalize";

const useFetchTickets = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const tickets = useSelector(collectionState);

  const fetchTickets = catchAsync(
    async (searchKeyword: string, page: number) => {
      try {
        const normWord = semiNormalize(searchKeyword);
        const { data } = await clientWithAuth.get(
          `/api/v1/collection/tickets?page=${page}&search=${normWord}`,
        );
        dispatch(
          updateCollection({
            tickets: [...tickets, ...data.data.tickets],
            results: data.results,
            busy: false,
            allDataLoaded: data.returned < 50,
          }),
        );
      } finally {
        dispatch(
          updateCollection({
            busy: false,
          }),
        );
      }
    },
  );
};

export default useFetchTickets;
