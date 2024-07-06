'use client'

import useIndexDB from "@/shared/hook/useIndexDB";
import useWorker from "@/shared/hook/useWorker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Home() {
  const [result, postMessage] = useWorker({ url: "/worker.js" });
  const { setIndexedDb, deleteIndexDbByKey, getIndexDbByKey } = useIndexDB(
    "INDEXEDB",
    "POSTS"
  );
  const [post, setPost] = useState({ title: "", content: "" });

  const temporaryStorage = () => {
    deleteIndexDbByKey();
  };
  useEffect(() => {
    if (result) {
      setIndexedDb("POSTS", result);
    }
  }, [result, setIndexedDb]);
  useEffect(() => {
    const checkPost = async () => {
      const temporaryPost = await getIndexDbByKey("temporaryStorage");
      if (temporaryPost) {
        setPost({
          title: temporaryPost.title,
          content: temporaryPost.content,
        });
      }
    };
    checkPost();
  }, [getIndexDbByKey, post]);
  return (
    <div>
      <label>제목</label>
      <input
        type="text"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <label>내용</label>
      <textarea
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
      ></textarea>
      <button onClick={temporaryStorage}>임시저장</button>
      <button
        onClick={() =>
          postMessage({
            createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            title: post.title,
            content: post.content,
            postId: Math.floor(Math.random() * 1000),
          })
        }
      >
        저장하기
      </button>
    </div>
  );
}
