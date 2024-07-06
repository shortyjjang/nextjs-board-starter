"use client";
import useIndexDB from "@/shared/hook/useIndexDB";
import useWorker from "@/shared/hook/useWorker";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";

export default function Home() {
  const id = useSearchParams()
  const [result, postMessage] = useWorker({ url: "/worker.js" });
  const { setIndexedDb, getIndexDbByKey } = useIndexDB("INDEXEDB", 'POSTS');
  const [post, setPost] = useState({ title: "", body: "" });

  const temporaryStorage = () => {
    const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    setIndexedDb(dayjs(createTime).format('YYYYMMDD_HHmmss'), {
        createTime: createTime,
        ...post
    });
  };
  useEffect(() => {

  }, [result]);
  return <div></div>;
}
