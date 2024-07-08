"use client";
import Board from "@/widgets/bbs";
import React from "react";
import { BOARD_TYPES } from "../../../enum";
import { useParams } from "next/navigation";

export default function BoardWriteIndex() {
  const { managementId } = useParams();
  return <Board managementId={Number(managementId)} type={BOARD_TYPES.WRITE} />;
}
