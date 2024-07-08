"use client";

import { BOARD_TYPES } from "@/app/enum";
import Board from "@/widgets/board";
import { useParams } from "next/navigation";

export default function BoardIndex() {
  const managementId = useParams().managementId;
  return (
    <div>
      <Board managementId={Number(managementId)} type={BOARD_TYPES.LIST} />
    </div>
  );
}