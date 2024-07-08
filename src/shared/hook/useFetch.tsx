import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const FETCH_INITIONAL = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: null,
};
const token = Cookies.get("accessToken");

type fetchState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: any;
};

const reducer = (
  state: fetchState,
  action: {
    type: "FETCH_INIT" | "FETCH_SUCCESS" | "FETCH_FAILURE";
    payload?: any;
  }
) => {
  return {
    isLoading: action.type === "FETCH_INIT",
    isError: action.type === "FETCH_FAILURE",
    isSuccess: action.type === "FETCH_SUCCESS",
    data: action.payload,
  };
};

const useFetch = (
  url: string,
  body = {},
  requiredToken: boolean = false,
  method: "POST" | "GET" = "POST"
) => {
  const [state, dispatch] = useReducer(reducer, FETCH_INITIONAL);
  const router = useRouter();
  const refetch = useCallback(async () => {
    if (requiredToken && !token) {
      dispatch({ type: "FETCH_FAILURE", payload: "로그인이 필요합니다." });
    }
    dispatch({ type: "FETCH_INIT", payload: null });
    const response =
      method === "GET"
        ? await axios.get(process.env.NEXT_PUBLIC_API_URL + url, {
            params: body,
            headers: requiredToken
              ? {
                  Authorization: token,
                }
              : {},
          })
        : await axios.post(process.env.NEXT_PUBLIC_API_URL + url, body, {
            headers: requiredToken
              ? {
                  Authorization: token,
                }
              : {},
          });
    if (!response || !response.data || response.data.meta?.resultMsg) {
      dispatch({
        type: "FETCH_FAILURE",
        payload:
          response.data.meta?.resultMsg || "알 수 없는 오류가 발생했습니다.",
      });
      router.back();
      return;
    }
    dispatch({ type: "FETCH_SUCCESS", payload: response.data.content });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body, method, requiredToken, url]);
  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    ...state,
    refetch,
  };
};

export default useFetch;
