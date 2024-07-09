import { memo } from "react";

function BbsListPagination({
  totalPagesCount,
  currentPage,
  onMovePage,
}: {
  totalPagesCount: number;
  currentPage: number;
  onMovePage: (page: number) => void;
}) {
  return Array.from(
    { length: totalPagesCount < 6 ? totalPagesCount : 5 },
    (_, i) => (
      <button
        key={i}
        onClick={() =>
          onMovePage(currentPage < 3 ? i + 1 : currentPage + i - 2)
        }
      >
        {currentPage < 3 ? i + 1 : currentPage + i - 2}
      </button>
    )
  );
}
BbsListPagination.displayName = "BbsListPagination";
export default memo(BbsListPagination);
