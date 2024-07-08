import { BoardContext } from "@/shared/context/board";
import React, { useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import ListHeader from "./listHeader";
import axios from "axios";
import useToggle from "@/shared/hook/useToggle";

export default function AccordionList(list: boardListType) {
  const bbsInfo = useContext(BoardContext);
  const post = useRef<postProps | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const contents = useToggle();
  const height = useRef(0);
  useEffect(() => {
    if(ref.current && post.current && height.current === 0) {
      height.current = ref.current.clientHeight;
      contents.show();
    }
  },[ref, post, contents])
  return (
    <div>
      <ListHeader {...list} onClick={async () => {
        if(!post.current) {
          const request = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/board/v1/${bbsInfo?.id}/${list.articleId}`, {
            headers: (bbsInfo?.readRole === "USER" || bbsInfo?.readRole === "ADMIN") ? {
              Authorization: Cookies.get("accessToken"),
            }: {},
          });
          if (!request.data || request.data?.meta?.resultMsg) {
            alert(request.data?.meta?.resultMsg);
            return;
          }
          post.current = request.data.content || null;
          return;
        }
        contents.toggle();
      }} />
      <div className="relative overflow-hidden" style={{
        overflow: 'hidden',
        position: 'relative',
        height: contents.visible ? height.current+'px' : 0,
        transition: "height 0.3s ease-in-out",
      }}>
        <div dangerouslySetInnerHTML={{__html: post?.current?.contents || ''}} />
        <div ref={ref} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 0,
        }} dangerouslySetInnerHTML={{__html: post?.current?.contents || ''}} />
      </div>
    </div>
  );
}
