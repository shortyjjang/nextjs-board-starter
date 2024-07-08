import React, { useContext } from 'react'
import { BoardContext } from '@/shared/context/board';
import dayjs from 'dayjs';

export default function ListHeader({
    list,
    onClick
}: {
    list: boardListType;
    onClick?: () => void;
}) {
    const bbsInfo = useContext(BoardContext);
  return (
    <div onClick={() =>  onClick && onClick()}>
      <div>{list.title}</div>
      {bbsInfo?.categoryUseYn === "Y" && (
        <div>
          {
            (bbsInfo?.categoryList || []).find(
              (category: { id: number; name: string }) =>
                category.id === list.categoryId
            )?.name
          }
        </div>
      )}
      <div>{list.createBy}</div>
      {bbsInfo?.registerTimeUseYn === "Y" && (
        <div>{dayjs(list.createTime).format("YYYY-MM-DD")}</div>
      )}
      {bbsInfo?.viewCountUseYn === "Y" && <div>{list.viewCount}</div>}
      {bbsInfo?.voteUseYn === "Y" && <div>{list.voteCount}</div>}
    </div>
  )
}
