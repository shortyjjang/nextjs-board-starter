import { useEffect, useReducer } from "react";
import useFetch from "./useFetch";

const PAGING_LIST_INITAL = {
  currentPage: 0,
  totalCount: 0,
  totalPagesCount: 0,
  lists: [],
};

const reducer = (
  state: pagingState,
  action: {
    type: "FETCH_INIT" | "FETCH_SUCCESS" | "FETCH_FAILURE";
    payload?: {
      currentPage: number;
      totalCount: number;
      totalPagesCount: number;
      lists: any[];
    };
  }
) => {
  if (action.type === "FETCH_SUCCESS") {
    return {
      ...state,
      currentPage: action.payload?.currentPage || 0,
      totalCount: action.payload?.totalCount || 0,
      totalPagesCount: action.payload?.totalPagesCount || 0,
      lists: action.payload?.lists || [],
    };
  }
  return PAGING_LIST_INITAL;
};

export default function useGetPagination({
  url,
  body = {},
  requiredToken = false,
  method = "POST",
}: {
  url: string;
  body?: any;
  requiredToken?: boolean;
  method?: "GET" | "POST";
}) {
  const { isLoading, isError, isSuccess, data, refetch } = useFetch(
    url,
    body,
    requiredToken,
    method
  );
  const [state, dispatch] = useReducer(reducer, PAGING_LIST_INITAL);

  useEffect(() => {
    dispatch({
      type: isLoading
        ? "FETCH_INIT"
        : isError
        ? "FETCH_FAILURE"
        : isSuccess
        ? "FETCH_SUCCESS"
        : "FETCH_INIT",
      payload: {
        currentPage: data?.currentPage,
        totalCount: data?.totalCount,
        totalPagesCount: data?.totalPagesCount,
        lists: data?.contents,
      },
    });
  }, [isLoading, isError, isSuccess, data]);

  return {
    isLoading,
    isError,
    isSuccess,
    refetch,
    ...state,
  };
}
