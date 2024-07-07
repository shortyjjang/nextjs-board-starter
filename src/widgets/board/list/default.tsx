import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';
import useGetPagination from '@/shared/hook/useGetPagination';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { BoardContext } from '@/shared/context/board';

export default function DefaultList() {
    const bbsInfo = useContext(BoardContext);
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
  return (
    <div>
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
    </div>
  )
}
