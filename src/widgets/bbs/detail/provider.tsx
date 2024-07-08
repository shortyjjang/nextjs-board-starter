import { BbsContext } from "@/widgets/bbs/board.context";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import Write from "../write";
import { BOARD_TYPES } from "@/app/enum";
import useFetch from "@/shared/hook/useFetch";
import BbsDetailView from "./view";

type BbsDetailContextProps = Partial<postProps>;

const BbsDetailContext = createContext<BbsDetailContextProps>({});

export default function BbsViewProvider({
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
  return (<BbsDetailContext.Provider value={post}>
    {type === BOARD_TYPES.VIEW && <BbsDetailView />}
    {type === BOARD_TYPES.EDIT && <Write />}
    </BbsDetailContext.Provider>)
}
