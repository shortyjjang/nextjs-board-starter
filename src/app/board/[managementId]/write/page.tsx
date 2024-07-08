'use client'
import Board from '@/widgets/board'
import React from 'react'
import { BOARD_TYPES } from '../../../enum'

export default function BoardWriteIndex() {
  return (
    <Board managementId={2} type={BOARD_TYPES.WRITE} />
  )
}
