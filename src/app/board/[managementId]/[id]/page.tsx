"use client";

import Board from "@/widgets/bbs";
import { BOARD_TYPES } from "../../../enum";
import { useParams } from "next/navigation";

export default function Post() {
  const { managementId } = useParams();
  if(managementId) return <Board managementId={Number(managementId)} type={BOARD_TYPES.VIEW} />;
  return null;
}
