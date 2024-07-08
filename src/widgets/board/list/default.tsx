import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { BoardContext } from "@/shared/context/board";
import { ListContext } from ".";
import ListHeader from "./listHeader";

export default function DefaultList() {
  const bbsInfo = useContext(BoardContext);
  const { lists } = useContext(ListContext);
  const router = useRouter();
  return (
    lists.map((list) => (
      <ListHeader
        list={list}
        key={list.articleId}
        onClick={() => {
          if (
            bbsInfo?.readRole === "NON" ||
            (bbsInfo?.readRole === "USER" && Cookies.get("accessToken"))
          )
            router.push(`/board/${bbsInfo?.id}/${list.articleId}`);
        }}
       />
    ))
  );
}
