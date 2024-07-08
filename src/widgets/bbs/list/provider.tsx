import React, { createContext, useContext, useEffect, useState } from "react";
import useGetPagination from "@/shared/hook/useGetPagination";
import Cookies from "js-cookie";
import { BbsContext, BbsListContext } from "@/widgets/bbs/board.context";
import Select from "@/entites/select";
import Input from "@/entites/input";
import AccordionList from "./accordion";
import ListHeader from "./item";
import BbsListSearchText from "./searchText";
import BbsListPagination from "./pagination";
import BbsSearchCategory from "./searchCategory";

export default function BbsListProvider() {
  const bbsInfo = useContext(BbsContext);
  const [params, setParams] = useState<boardListRequestProps>({
    managementId: bbsInfo.id,
    page: 1,
    rows: 20,
  });
  const {
    lists,
    totalCount,
    totalPagesCount,
    currentPage,
    isLoading,
    refetch: get,
  } = useGetPagination({
    url: `/api/board/v1`,
    body: params,
    method: "POST",
  });
  useEffect(() => {
    get();
  }, [params]);
  return (
    <BbsListContext.Provider
      value={{
        lists,
        totalCount,
        totalPagesCount,
        currentPage,
      }}
    >
      <div>
        <div>{totalCount}개</div>
        <BbsSearchCategory
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
          categoryId={params.categoryId || 0}
          setParams={setParams}
        />
      </div>
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        lists.map((list) =>
          bbsInfo?.markType === "LIST" ? (
            <ListHeader key={list.articleId} {...list} />
          ) : (
            <AccordionList key={list.articleId} {...list} />
          )
        )
      )}
      {(bbsInfo?.writeRole === "NON" ||
        (bbsInfo?.writeRole === "USER" && Cookies.get("accessToken"))) && (
        <button>글쓰기</button>
      )}
      {
        <BbsListPagination
          totalPagesCount={totalPagesCount}
          currentPage={currentPage}
          onMovePage={(page) =>
            setParams({
              ...params,
              page: page,
            })
          }
        />
      }
      <BbsListSearchText
        searchList={(key, value) =>
          setParams((prev) => ({
            ...prev,
            [key]: value,
          }))
        }
      />
    </BbsListContext.Provider>
  );
}
