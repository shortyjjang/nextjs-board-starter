import  { useContext, useEffect, useState } from "react";
import useGetPagination from "@/shared/hook/useGetPagination";
import Cookies from "js-cookie";
import { BbsContext, BbsListContext } from "@/widgets/bbs/board.context";
import AccordionList from "./accordion";
import BbsListSearchText from "./searchText";
import BbsListPagination from "./pagination";
import BbsSearchCategory from "./searchCategory";
import BbsListItem from "./item";
import { useRouter } from "next/navigation";

export default function BbsListProvider() {
  const bbsInfo = useContext(BbsContext);
  const router = useRouter();
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
  useEffect(function onLoad(){
    get();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <BbsListItem onClick={() => {
              router.push(`/board/${bbsInfo.id}/${list.articleId}`)
            }} key={list.articleId} {...list} />
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
            setParams((prev) => ({
              ...prev,
              page: page,
            }))
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
BbsListProvider.displayName = "BbsListProvider";