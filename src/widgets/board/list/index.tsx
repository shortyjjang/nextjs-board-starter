import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useGetPagination from "@/shared/hook/useGetPagination";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { BoardContext } from "@/shared/context/board";
import DefaultList from "./default";
import Select from "@/entites/select";
import Input from "@/entites/input";
import AccordionList from "./accordion";

export const ListContext = createContext<{
  lists: boardListType[];
  isLoading: boolean;
  totalCount: number;
  totalPagesCount: number;
  currentPage: number;
}>({
  lists: [],
  isLoading: false,
  totalCount: 0,
  totalPagesCount: 0,
  currentPage: 0,
});

export default function List() {
  const bbsInfo = useContext(BoardContext);
  const router = useRouter();
  const [searchType, setSearchType] = useState<
    "title" | "contents" | "registerName" | "registerId"
  >("title");
  const [params, setParams] = useState<boardListRequestProps>({
    managementId: bbsInfo.id,
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
  }: {
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
  const searchList = (event: React.FormEvent) => {
    event.preventDefault();
    get();
  };
  useEffect(() => {
    get();
  }, [params, get]);
  useEffect(() => {
    if (!bbsError) return;
    alert(bbsError);
    router.push("/");
  }, [bbsError, router]);
  return (
    <ListContext.Provider
      value={{
        lists,
        isLoading,
        totalCount,
        totalPagesCount,
        currentPage,
      }}
    >
      <div>
        <div>{totalCount}개</div>
        <Select
          options={[
            {
              label: "전체",
              value: "",
            },
            ...bbsInfo?.categoryList.map((category) => ({
              label: category.name,
              value: category.id,
            })),
          ]}
          value={params.categoryId || ""}
          onChange={(value) =>{
            let pa:boardListRequestProps = { ...params, categoryId: value as number };

            if(value === "") {
              delete pa.categoryId;
            }
            setParams(pa)
          }}
        />
      </div>
      {bbsInfo?.markType === "LIST" && <DefaultList />}
      {bbsInfo?.markType === "ACCORDION" && lists.map((list) => (
        <AccordionList key={list.articleId} list={list} />
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
      <form onSubmit={searchList}>
        <Select
          options={[
            { label: "제목", value: "title" },
            { label: "내용", value: "contents" },
            { label: "작성자명", value: "registerName" },
            { label: "작성자아이디", value: "registerId" },
          ]}
          value={searchType || ''}
          onChange={(value) => {
            setSearchType(
              value as "title" | "contents" | "registerName" | "registerId"
            );
          }}
        />
        <Input
          value={params[searchType] || ""}
          onChange={(value) => {
            setParams({
              ...params,
              [searchType]: value,
            });
          }}
        />
      </form>
    </ListContext.Provider>
  );
}
