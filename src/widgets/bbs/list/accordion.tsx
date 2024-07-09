import { BbsContext } from "@/widgets/bbs/board.context";
import  { useCallback, useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import useToggle from "@/shared/hook/useToggle";
import BbsListItem from "./item";

export default function BbsListAccordion(list: boardListType) {
  const bbsInfo = useContext(BbsContext);
  const post = useRef<postProps | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const contents = useToggle();
  const height = useRef(0);
  const setHeight = useCallback(() => {
    if (ref.current) {
      height.current = ref.current.clientHeight;
    }
  }, []);
  useEffect(() => {
    setHeight();
    window.addEventListener("resize", setHeight);
    return () => {
      window.removeEventListener("resize", setHeight);
    };
  }, [setHeight]);
  return (
    <div>
      <BbsListItem
        {...list}
        onClick={async () => {
          if (!post.current) {
            const request = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/board/v1/${bbsInfo?.id}/${list.articleId}`,
              {
                headers:
                  bbsInfo?.readRole === "USER" || bbsInfo?.readRole === "ADMIN"
                    ? {
                        Authorization: Cookies.get("accessToken"),
                      }
                    : {},
              }
            );
            if (!request.data || request.data?.meta?.resultMsg) {
              alert(request.data?.meta?.resultMsg);
              return;
            }
            post.current = request.data.content || null;
            setHeight();
          }
          contents.toggle();
        }}
      />
      {contents.visible.toString()}
      {post.current?.title}
     {post.current && <div
        className="relative overflow-hidden"
        style={{
          overflow: "hidden",
          position: "relative",
          height: contents.visible ? height.current + "px" : 0,
          transition: "height 0.3s ease-in-out",
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: post?.current?.contents || "" }}
        />
        <div
          ref={ref}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            opacity: 0,
          }}
          dangerouslySetInnerHTML={{ __html: post?.current?.contents || "" }}
        />
      </div>}
    </div>
  );
}

BbsListAccordion.displayName = "BbsListAccordion";