import React, { useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function useQuery({
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
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<string>("");
  const router = useRouter();
  const refetch = useCallback(async () => {
    setIsLoading(true);
    const token = Cookies.get("accessToken");
    const response =
      method === "GET"
        ? await axios.get("https://qa-yesus-api.a2dcorp.co.kr" + url, {
            params: body,
            headers: requiredToken ? {
              Authorization: token,
            } : {},
          })
        : await axios.post("https://qa-yesus-api.a2dcorp.co.kr" + url, body, {
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
    setData(response.data.content);
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
  }, []);
  return { isLoading, data, error, refetch };
}
