import  { useContext } from "react";
import { BbsContext } from "@/widgets/bbs/board.context";
import dayjs from "dayjs";

export default function BbsListItem({
  title,
  categoryId,
  createBy,
  createTime,
  viewCount,
  voteCount,
  onClick,
}: bbsListItemProps) {
  const {
    categoryUseYn,
    registerTimeUseYn,
    viewCountUseYn,
    voteUseYn,
    categoryList,
  } = useContext(BbsContext);
  return (
    <div onClick={() => onClick && onClick()}>
      <div>{title}</div>
      {categoryUseYn === "Y" && (
        <div>
          {
            (categoryList || []).find(
              (category: { id: number; name: string }) =>
                category.id === categoryId
            )?.name
          }
        </div>
      )}
      <div>{createBy}</div>
      {registerTimeUseYn === "Y" && (
        <div>{dayjs(createTime).format("YYYY-MM-DD")}</div>
      )}
      {viewCountUseYn === "Y" && <div>{viewCount}</div>}
      {voteUseYn === "Y" && <div>{voteCount}</div>}
    </div>
  );
}

interface bbsListItemProps extends boardListType {
  onClick?: () => void | Promise<void>;
}

BbsListItem.displayName = "BbsListItem";