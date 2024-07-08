"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div> 
      <Link href="/board/1">공지사항</Link>
      <Link href="/board/2">구매후기</Link>
      <Link href="/board/4">자주묻는질문</Link>
    </div>
  );
}
