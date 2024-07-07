"use client";

import Photo from "@/entites/photo";
import useGetPagination from "@/shared/hook/useGetPagination";
import useIndexDB from "@/shared/hook/useIndexDB";
import useQuery from "@/shared/hook/useQuery";
import useWorker from "@/shared/hook/useWorker";
import dayjs from "dayjs";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import BoardWrapper, { BoardContext } from "@/widgets/board";

type BoardContextProps = {
  id: number;
  name: string;
  markType: string;
  guide: string;
  useProductYn: string;
  replyUseYn: string;
  sortType: string;
  nameMarkType: string;
  defaultTitleUseYn: string;
  defaultTitle: string;
  defaultContentsUseYn: string;
  defaultContents: string;
  viewCountUseYn: string;
  listContentsMarkUseYn: string;
  registerTimeUseYn: string;
  writeRole: string;
  readRole: string;
  fileUploadUseYn: string;
  scoreUseYn: string;
  voteUseYn: string;
  commentUseYn: string;
  replyCommentUseYn: string;
  categoryUseYn: string;
  secretUseYn: string;
  categoryList: {
    id: number;
    name: string;
  }[];
  reviewPoint: {};
};

type boardListRequestProps = {
  categoryId?: number;
  contents?: string;
  endDate?: string;
  managementId: number;
  page: number;
  productId?: number;
  registerId?: string;
  registerName?: string;
  registerNickname?: string;
  rows: number;
  startDate?: string;
  title?: string;
  isBestYn?: "Y" | "N";
};
type boardListType = {
  "articleId": string,
  "managementId": 7,
  "parentId": string,
  "title": string,
  "voteCount": number,
  "secretYn":string,
  "createBy": string,
  "createTime": string,
  "notificationYn": "N" | "Y",
  "newPostYn": "N" | "Y",
  "questionStatus": "N" | "Y",
  "depth": number,
  categoryId: number;
  viewCount: number;
}

export default function Home() {
  const bbsInfo = useContext(BoardContext)
  const [params, setParams] = useState<boardListRequestProps>({
    managementId: 2,
    page: 1,
    rows: 20,
  });
  const {
    lists,
    isLoading,
    totalCount,
    totalPagesCount,
    currentPage,
    error: bbsError,
    refetch: get,
  }:{
    lists: boardListType[];
    isLoading: boolean;
    totalCount: number;
    totalPagesCount: number;
    currentPage: number;
    error: string;
    refetch: () => void;
  
  } = useGetPagination({
    url: `/api/board/v1`,
    body: params,
    method: "POST",
  });
  const router = useRouter();

  // const [result, postMessage] = useWorker({ url: "/worker.js" });
  // const [files, setFiles] = useState<File[]>([]);
  // const { setIndexedDb, deleteIndexDbByKey, getIndexDbByKey } = useIndexDB(
  //   "INDEXEDB",
  //   "POSTS"
  // );
  // const [post, setPost] = useState({ title: "", content: "" });

  // const temporaryStorage = () => {
  //   deleteIndexDbByKey();
  // };
  // useEffect(() => {
  //   if (result) {
  //     setIndexedDb("POSTS", result);
  //   }
  // }, [result, setIndexedDb]);
  // useEffect(() => {
  //   const checkPost = async () => {
  //     const temporaryPost = await getIndexDbByKey("temporaryStorage");
  //     if (temporaryPost) {
  //       setPost({
  //         title: temporaryPost.title,
  //         content: temporaryPost.content,
  //       });
  //     }
  //   };
  //   checkPost();
  // }, [getIndexDbByKey, post]);
  return (
    <BoardWrapper>
      <h1>{bbsInfo?.name}</h1>
      <div>
        <div>{totalCount}개</div>
      </div>
      {lists.map((list) => (
        <div key={list.articleId} onClick={() => {
          if(bbsInfo?.readRole === "NON" ||
            (bbsInfo?.readRole === "USER" && Cookies.get("accessToken"))) router.push(`${list.articleId}`);
        }}>
          <div>{list.title}</div>
          {bbsInfo?.categoryUseYn === 'Y' && <div>{(bbsInfo?.categoryList || []).find((category: {
            id: number;
            name: string;
          }) => category.id === list.categoryId)?.name}</div>}
          <div>{list.createBy}</div>
          {bbsInfo?.registerTimeUseYn === 'Y' && <div>{dayjs(list.createTime).format("YYYY-MM-DD")}</div>}
          {bbsInfo?.viewCountUseYn === 'Y' && <div>{list.viewCount}</div>}
          {bbsInfo?.voteUseYn === 'Y' && <div>{list.voteCount}</div>}
        </div>
      ))}
      {(bbsInfo?.writeRole === "NON" ||
        (bbsInfo?.writeRole === "USER" && Cookies.get("accessToken"))) && (
        <button>글쓰기</button>
      )}
      {Array.from(
        { length: totalPagesCount < 6 ? totalPagesCount : 5 },
        (_, i) => (
          <button
            key={i}
            onClick={() =>
              setParams({
                ...params,
                page: currentPage < 3 ? i + 1 : currentPage + i - 2,
              })
            }
          >
            {currentPage < 3 ? i + 1 : currentPage + i - 2}
          </button>
        )
      )}
    </BoardWrapper>
  );
}
