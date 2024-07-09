import { BbsContext, BbsDetailContext } from "@/widgets/bbs/board.context";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import  { useContext } from "react";
import Cookies from "js-cookie";
import dayjs from "dayjs";

export default function BbsDetailView() {
  const {
    id,
    categoryUseYn,
    categoryList,
    registerTimeUseYn,
    viewCountUseYn,
    voteUseYn,
  } = useContext(BbsContext);
  const articleId = useParams().id;
  const router = useRouter();
  const {
    title,
    categoryId,
    createBy,
    createTime,
    viewCount,
    voteCount,
    contents,
    isEditable,
  } = useContext(BbsDetailContext);
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
  return (
    <div>
      <div>{title}</div>
      {categoryUseYn === "Y" && (
        <div>
          {
            (categoryList || []).find(
              (category: { id: number; name: string }) =>
                category.id === categoryId
            )?.name
          }
        </div>
      )}
      <div>{createBy}</div>
      {registerTimeUseYn === "Y" && (
        <div>{dayjs(createTime).format("YYYY-MM-DD")}</div>
      )}
      {viewCountUseYn === "Y" && <div>{viewCount}</div>}
      {voteUseYn === "Y" && <div>{voteCount}</div>}
      <div dangerouslySetInnerHTML={{ __html: contents || "" }} />
      <button onClick={() => router.push(`/board/${id}`)}>목록</button>
      {isEditable && (
        <div>
          <button>수정</button>
          <button onClick={deletePost}>삭제</button>
        </div>
      )}
    </div>
  );
}

BbsDetailView.displayName = "BbsDetailView";
