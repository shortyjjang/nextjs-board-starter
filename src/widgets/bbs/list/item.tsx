import React, { useContext } from 'react'
import { BbsContext } from '@/widgets/bbs/board.context';
import dayjs from 'dayjs';

export default function BbsListItem({
    title,
    categoryId,
    createBy,
    createTime,
    viewCount,
    voteCount,
    onClick
}: bbsListItemProps) {
    const bbsInfo = useContext(BbsContext);
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

interface bbsListItemProps extends boardListType {
  onClick?: () => void | Promise<void>;
}