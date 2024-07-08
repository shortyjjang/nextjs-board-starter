import React, { FormEvent, useContext, useEffect, useId, useState } from "react";
import Input from "@/entites/input";
import Select from "@/entites/select";
import { BoardContext } from "@/shared/context/board";
import Textarea from "@/entites/textarea";
import Checkbox from "@/entites/checkbox";
import Photo from "@/entites/photo";
import Radio from "@/entites/radio";

export default function Write({
  defaultPost,
}: {
  defaultPost?: PostProps
}) {
  const id = useId();
  const {categoryList, defaultTitle, defaultContents, categoryUseYn, secretUseYn, fileUploadUseYn, scoreUseYn } = useContext(BoardContext)
  const [post, setPost] = useState<any>({
    title: "",
    contents: "",
    categoryId: 0,
    secretYn: false,
  });
  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  useEffect(() => {
    setPost((prev:any) => ({
      ...prev,
      title: defaultTitle || defaultPost?.title || "",
      contents: defaultContents || defaultPost?.contents || "",
      categoryId: defaultPost?.categoryId || 0,
      secret: defaultPost?.secretYn === 'Y' ? true : false,
      fileList: defaultPost?.fileList || [],
      deleteFileId: [],
      scrore: 5,
    }))

    return () => {
      setPost({
        title: "",
        contents: "",
        categoryId: 0,
        secretYn: false,
        fileList: [],
        deleteFileId: [],
      });
    }
  }, [defaultPost]);
  return (
    <form onSubmit={createPost}>
      <div>
        <label htmlFor={id + "title"}>제목</label>
        <Input value={post.title} onChange={(value) => {
          setPost({
            ...post,
            title: value,
          });
        }} id={id + "title"} />
      </div>
      {categoryUseYn === 'Y' && <div>
        <label htmlFor={id + "category"}>카테고리</label>
        <Select value={post.categoryId} id={id + 'category'} onChange={(value) => {
          setPost({
            ...post,
            categoryId: value as number,
          });
        }} options={
          categoryList.map((category) => ({
            label: category.name,
            value: (category.id),
          }))
        } />
      </div>}
      {scoreUseYn === 'Y' && <div>
        <label htmlFor={id + "category"}>평점</label>
        <Radio options={Array.from({ length: 5 }, (_, i) => ({
          label: i + 1 + '점',
          value: i + 1,
        }))} value={post.score} onChange={(value) => {
          setPost({
            ...post,
            score: value,
          });
        }} />
      </div>}
      <div>
        <label htmlFor={id + "contents"}>내용</label>
        <Textarea value={post.contents} onChange={(value) => {
          setPost({
            ...post,
            contents: value,
          });
        }} id={id + "contents"} />
      </div>
      {secretUseYn === 'Y' && <div>
        <label htmlFor={id + "secret"}>비밀글</label>
        <Checkbox checked={post.secret} onChange={(checked) => {
          setPost({
            ...post,
            secret: checked,
          });
        }} id={id + "secret"} />
      </div>}
      {fileUploadUseYn === 'Y' && <div>
        <label htmlFor={id + "file"}>파일</label>
        <Photo files={post.fileList} setFiles={(files) => {
          setPost((prev:any) => ({
            ...prev,
            fileList: files,
          }))
        }} id={id + "file"} deleteFileId={post.deleteFileId} setDeleteFileId={(ids) => {
          setPost((prev:any) => ({
            ...prev,
            deleteFileId: ids,
          }))
        }} />
      </div>}
      <button type="submit">작성</button>
    </form>
  );
}
