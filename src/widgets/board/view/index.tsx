import { BoardContext } from "@/shared/context/board";
import useQuery from "@/shared/hook/useQuery";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import Write from "../write";
import { BOARD_TYPES } from "@/app/enum";

export default function Detail({
  type = BOARD_TYPES.VIEW,
}: {
  type?: Omit<boardType, 'LIST' | 'WRITE'>;
}) {
  const {
    id,
    categoryUseYn,
    categoryList,
    registerTimeUseYn,
    viewCountUseYn,
    voteUseYn,
    readRole,
  } = useContext(BoardContext);
  const articleId = useParams().id;
  const router = useRouter();
  const {
    data: post,
    error,
  }: {
    data: PostProps;
    error: string;
    refetch: () => void;
  } = useQuery({
    url: `/api/board/v1/${id}/${articleId}`,
    method: "GET",
    requiredToken: readRole === "USER" || readRole === "ADMIN" ? true : false,
  });
  const deletePost = async () => {
    const request = await axios.post(
      `/api/board/v1/${id}/${articleId}`,
      {
        articleId: articleId,
        customerMallCd: "YESUS",
        // customerUid: user.username,
        managementId: id,
      },
      {
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      }
    );
    if (!request.data || request.data?.meta?.resultMsg) {
      alert(request.data?.meta?.resultMsg);
      return;
    }
    alert("삭제되었습니다.");
    router.push("/");
  };
  useEffect(() => {
    if (!error) return;
    alert(error);
    if (error) {
      router.push("/");
    }
  }, [error, router]);
  if(type === BOARD_TYPES.VIEW) return (
    <div>
      <div>{post?.title}</div>
      {categoryUseYn === "Y" && (
        <div>
          {
            (categoryList || []).find(
              (category: { id: number; name: string }) =>
                category.id === post?.categoryId
            )?.name
          }
        </div>
      )}
      <div>{post?.createBy}</div>
      {registerTimeUseYn === "Y" && (
        <div>{dayjs(post?.createTime).format("YYYY-MM-DD")}</div>
      )}
      {viewCountUseYn === "Y" && <div>{post?.viewCount}</div>}
      {voteUseYn === "Y" && <div>{post?.voteCount}</div>}
      <div dangerouslySetInnerHTML={{ __html: post?.contents }} />
      <button onClick={() => router.push(`/board/${id}`)}>목록</button>
      {post?.isEditable && (
        <div>
          <button onClick={() => router.push(`/board/${id}/${articleId}/edit`)}>수정</button>
          <button onClick={deletePost}>삭제</button>
        </div>
      )}
    </div>
  );
  if(type === BOARD_TYPES.EDIT) {
    <Write defaultPost={post} />
  }
}
