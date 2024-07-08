"use client";

import { BOARD_TYPES } from "@/app/enum";
import Board from "@/widgets/bbs";
import { useParams } from "next/navigation";

export default function PostEdit() {
  const { managementId } = useParams();
  return <Board managementId={Number(managementId)} type={BOARD_TYPES.EDIT} />;
}
