import clientWithAuth from "@src/api/clientWithAuth";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "@src/hooks/useCatchAsync";
import { semiNormalize } from "@src/utils/semiNormalize";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import useDebounce from "./useDebounce";
import {
  dictionaryLookupState,
  updateAllDataLoaded,
  updateBusy,
  updatePage,
  updateResults,
  updateDictEntries,
  updateSearchKeyword,
} from "@src/store/dictionaryLookup";

const useFetchDictEntries = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const catchAsync = useCatchAsync();
  const { searchKeyword, dictEntries, page } = useSelector(
    dictionaryLookupState,
  );

  const debouncedSearchKeyword = useDebounce(
    searchKeyword,
    500,
  );

  const fetchDictEntries = catchAsync(
    async (keyword: string, page: number) => {
      //console.log("# Fetching DictEntries");
      try {
        if (page === 1) dispatch(updateBusy(true));
        const normWord = semiNormalize(keyword);

        const { data } =
          normWord !== ""
            ? await clientWithAuth.get(
                `/api/v1/collection/dictionary-entries?page=${page}&search=${normWord}&limit=20`,
              )
            : { data: { data: { dictEntries: [] } } };
        dispatch(
          updateDictEntries(
            page === 1
              ? data.data.dictEntries
              : [...dictEntries, ...data.data.dictEntries],
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
      "blur",
      () => {
        dispatch(updateSearchKeyword(""));
      },
    );
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (page > 1) fetchDictEntries(searchKeyword, page);
  }, [page]);

  useEffect(() => {
    dispatch(updateBusy(true));
    dispatch(updatePage(1));
  }, [searchKeyword]);

  useEffect(() => {
    fetchDictEntries(debouncedSearchKeyword, 1);
  }, [debouncedSearchKeyword]);
};

export default useFetchDictEntries;
