import React, { useContext } from 'react'
import { BoardContext } from '@/shared/context/board';
import dayjs from 'dayjs';

export default function ListHeader({
    title,
    categoryId,
    createBy,
    createTime,
    viewCount,
    voteCount,
    onClick
}: listHeaderProps) {
    const bbsInfo = useContext(BoardContext);
  return (
    <div onClick={() =>  onClick && onClick()}>
      <div>{title}</div>
      {bbsInfo?.categoryUseYn === "Y" && (
        <div>
          {
            (bbsInfo?.categoryList || []).find(
              (category: { id: number; name: string }) =>
                category.id === categoryId
            )?.name
          }
        </div>
      )}
      <div>{createBy}</div>
      {bbsInfo?.registerTimeUseYn === "Y" && (
        <div>{dayjs(createTime).format("YYYY-MM-DD")}</div>
      )}
      {bbsInfo?.viewCountUseYn === "Y" && <div>{viewCount}</div>}
      {bbsInfo?.voteUseYn === "Y" && <div>{voteCount}</div>}
    </div>
  )
}

interface listHeaderProps extends boardListType {
  onClick?: () => void | Promise<void>;
}