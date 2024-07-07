import React, { useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [lists, setLists] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [totalPagesCount, setTotalPagesCount] = React.useState<number>(0);
  const router = useRouter();
  const refetch = useCallback(async () => {
    setIsLoading(true);
    const token = Cookies.get("accessToken");
    const response =
      method === "GET"
        ? await axios.get(url, {
            params: body,
            headers: requiredToken ? {
              Authorization: token,
            } : {},
          })
        : await axios.post(url, body, {
            headers: requiredToken ? {
              Authorization: token,
            } : {},
          });
    if (!response || !response.data || response.data.meta?.resultMsg) {
      setError(
        response.data.meta.resultMsg || "알 수 없는 오류가 발생했습니다."
      );
      return;
    }
    setLists(response.data.content.content);
    setCurrentPage(response.data.content.currentPage);
    setTotalCount(response.data.content.totalCount);
    setTotalPagesCount(response.data.content.totalPagesCount);
    setIsLoading(false);
  }, [body, method, url]);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (requiredToken && !token) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    refetch();
  }, [body]);
  return {
    isLoading,
    lists,
    error,
    refetch,
    currentPage,
    totalCount,
    totalPagesCount,
  };
}
