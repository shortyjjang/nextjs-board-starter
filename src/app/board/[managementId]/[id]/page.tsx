"use client";

import Board from "@/widgets/board";
import { BOARD_TYPES } from "../../../enum";

export default function Post() {
  return (
    <Board managementId={1} type={BOARD_TYPES.VIEW} />
  );
}
