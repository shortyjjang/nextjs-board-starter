
import List from "./list/provider";
import { BbsContext } from "@/widgets/bbs/board.context";
import Write from "./write";
import Detail from "./view";
import { BOARD_TYPES } from "@/app/enum";
import useFetch from "@/shared/hook/useFetch";

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
  return (
    <BbsContext.Provider
      value={{
        ...bbsInfo,
      }}
    >
      {isSuccess && bbsInfo ? (
        <>
          <h2>{bbsInfo.name}</h2>
          {type === BOARD_TYPES.LIST && <List />}
          {type === BOARD_TYPES.VIEW && <Detail />}
          {type === BOARD_TYPES.WRITE && <Write />}
          {type === BOARD_TYPES.EDIT && <Detail type={BOARD_TYPES.EDIT} />}
        </>
      ) : (
        <div>로딩중...</div>
      )}
    </BbsContext.Provider>
  );
}
