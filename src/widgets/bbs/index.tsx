
import { BOARD_TYPES } from "@/app/enum";
import useFetch from "@/shared/hook/useFetch";
import BbsListProvider from "./list/provider";
import BbsDetailProvider from "./detail/provider";
import { BbsContext } from "./board.context";
import BbsForm from "./form";

export default function Board({
  managementId,
  type,
}: {
  managementId: number;
  type: boardType;
}) {
  const {
    data: bbsInfo,
    isSuccess,
  }: {
    data: bbsContextProps;
    isSuccess: boolean;
  } = useFetch(`/api/board/v1/management/${managementId}`, {}, false, "GET");
  if(bbsInfo) return (
    <BbsContext.Provider
      value={{
        ...bbsInfo,
      }}
    >
      {isSuccess && bbsInfo ? (
        <>
          <h2>{bbsInfo.name}</h2>
          {type === BOARD_TYPES.LIST ? <BbsListProvider />
          : type === BOARD_TYPES.WRITE ? <BbsForm />
          : <BbsDetailProvider type={type} />}
        </>
      ) : (
        <div>로딩중...</div>
      )}
    </BbsContext.Provider>
  );
  return null;
}
Board.displayName = "Board";