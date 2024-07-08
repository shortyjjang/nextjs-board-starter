import { BoardContext } from "@/shared/context/board";
import React, { useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Accordion } from "@/entites/accordion";
import ListHeader from "./listHeader";
import axios from "axios";
import useToggle from "@/shared/hook/useToggle";

export default function AccordionList({
  list,
}:{
  list: boardListType;
}) {
  const bbsInfo = useContext(BoardContext);
  const [post, setPost] = useState<PostProps | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const contents = useToggle();
  const height = useRef(0);
  useEffect(() => {
    if(ref.current && post && height.current === 0) {
      height.current = ref.current.clientHeight;
      contents.show();
    }
  },[ref, post, contents])
  return (
    <div>
      <ListHeader list={list} onClick={async () => {
        if(!post) {
          const request = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/board/v1/${bbsInfo?.id}/${list.articleId}`, {
            headers: (bbsInfo?.readRole === "USER" || bbsInfo?.readRole === "ADMIN") ? {
              Authorization: Cookies.get("accessToken"),
            }: {},
          });
          if (!request.data || request.data?.meta?.resultMsg) {
            alert(request.data?.meta?.resultMsg);
            return;
          }
          setPost(request.data.content)
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
        <div dangerouslySetInnerHTML={{__html: post?.contents || ''}} />
        <div ref={ref} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 0,
        }} dangerouslySetInnerHTML={{__html: post?.contents || ''}} />
      </div>
    </div>
  );
}
