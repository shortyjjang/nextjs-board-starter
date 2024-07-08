"use client";

import { BOARD_TYPES } from "@/app/enum";
import Board from "@/widgets/board";


export default function PostEdit() {
  return (
    <Board managementId={1} type={BOARD_TYPES.EDIT} />
  );
}
