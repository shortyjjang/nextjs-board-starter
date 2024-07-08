import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useQuery from "@/shared/hook/useQuery";
import List from "./list";
import { BoardContext } from '@/shared/context/board';
import DefaultDetail from "./view/default";
import Write from "./write";
import Detail from "./view";
import { BOARD_TYPES } from "@/app/enum";

export default function Board({
  managementId,
  type
}: {
  managementId: number;
  type: boardType;
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
      <h2>{bbsInfo?.name}</h2>
      {bbsInfo && <>
        {type === BOARD_TYPES.LIST && <List />}
        {type === BOARD_TYPES.VIEW && <Detail />}
        {type === BOARD_TYPES.WRITE && <Write />}
        {type === BOARD_TYPES.EDIT && <Detail type={BOARD_TYPES.EDIT} />}
      </>}
    </BoardContext.Provider>
  );
}
