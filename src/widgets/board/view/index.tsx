
import useQuery from "@/shared/hook/useQuery";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BoardContext } from "@/shared/context/board";
import DefaultDetail from "./default";



export default function Detail({
  managementId,
}: {
  managementId: number;
}) {
  const router = useRouter();
  const {
    data: bbsInfo,
    error,
  }: {
    data: BoardContextProps;
    error: string;
    refetch: () => void;
  } = useQuery({
    url: `/api/board/v1/management/${managementId}`,
    method: "GET",
  });
  useEffect(() => {
    if (!error) return;
    alert(error);
    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  return (
    <BoardContext.Provider
      value={{
        ...bbsInfo,
      }}
    >
    <div>{bbsInfo?.name}</div>
    <DefaultDetail />
    </BoardContext.Provider>
  );
}
