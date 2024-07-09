"use client";

import { BOARD_TYPES } from "@/app/enum";
import Board from "@/widgets/bbs";
import { useParams } from "next/navigation";

export default function PostEdit() {
  const { managementId } = useParams();
  if(managementId) return <Board managementId={Number(managementId)} type={BOARD_TYPES.REPLY} />;
  return null;
}
