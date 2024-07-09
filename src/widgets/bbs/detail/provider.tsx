import { BbsContext, BbsDetailContext } from "@/widgets/bbs/board.context";
import { useParams, } from "next/navigation";
import  { useContext } from "react";
import { BOARD_TYPES } from "@/app/enum";
import useFetch from "@/shared/hook/useFetch";
import BbsDetailView from "./view";
import BbsForm from "../form";

export default function BbsDetailProvider({
  type = BOARD_TYPES.VIEW,
}: {
  type?: Omit<boardType, 'LIST' | 'WRITE'>;
}) {
  const {
    id,
    readRole,
  } = useContext(BbsContext);
  const articleId = useParams().id;
  const {
    data: post,
  }: {
    data: postProps;
  } = useFetch(
    `/api/board/v1/${id}/${articleId}`,
    {},
    readRole === "USER" || readRole === "ADMIN" ? true : false,
    "GET"
  );
  if(post) return (<BbsDetailContext.Provider value={post}>
    {type === BOARD_TYPES.VIEW ? <BbsDetailView />
    : <BbsForm type={type} />}
    </BbsDetailContext.Provider>)
  return null;
}

BbsDetailProvider.displayName = "BbsDetailProvider";