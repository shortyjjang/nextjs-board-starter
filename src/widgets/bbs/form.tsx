import  {
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import Input from "@/entites/input";
import Select from "@/entites/select";
import { BbsContext } from "@/widgets/bbs/board.context";
import Textarea from "@/entites/textarea";
import Checkbox from "@/entites/checkbox";
import Photo from "@/entites/photo";
import RadioGroup from "@/entites/radioGroup";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { BOARD_TYPES } from "@/app/enum";

interface postRequestProps extends Partial<postProps> {
  deleteFileId: number[];
  secret: boolean;
  customerMallCd: string;
  customerUid: string;
  articleId?: number;
  opId?: number;
  productId?: number;
  managementParentId?: number;
  parentId?: number;
}
const INITIAL_POST: postRequestProps = {
  title: "",
  contents: "",
  categoryId: 0,
  secret: false,
  fileList: [],
  deleteFileId: [],
  customerMallCd: "YESUS",
  customerUid: "",
};

const createPost = async ({
  post,
  username,
  managementId,
  articleId,
  parentId,
}: {
  post: postRequestProps;
  username: string;
  managementId: number;
  articleId?: number;
  parentId?: number;
}): Promise<boolean> => {
  let body = {
    ...post,
    managementId: managementId, //게시판 아이디
    customerMallCd: "YESUS",
    customerUid: username,
  };

  if (articleId) {
    body = {
      ...body,
      articleId: articleId,
    };
  }
  if (parentId) {
    body = {
      ...body,
      managementParentId: managementId,
      parentId: parentId,
    };
  }

  let formData = new FormData();

  formData.append(
    "request",
    new Blob([JSON.stringify(body)], {
      type: "application/json",
    })
  );
  if ((post.fileList || []).length > 0) {
    (post.fileList || []).forEach((file) => {
      formData.append("files", file);
    });
  }
  const request = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}${
      articleId ? `/api/board/v1/update` : `/api/board/v1/create`
    }`,
    formData,
    {
      headers: {
        Authorization: Cookies.get("accessToken")
          ? Cookies.get("accessToken")
          : null,
      },
    }
  );
  if (!request.data || request.data?.meta?.resultMsg) {
    alert(request.data?.meta?.resultMsg);
    return false;
  }
  alert("작성되었습니다.");
  return true;
};

export default function BbsForm({
  defaultPost,
  type = BOARD_TYPES.WRITE,
}: {
  defaultPost?: postProps;
  type?: Omit<boardType, "LIST" | "VIEW">;
}) {
  const { id: articleId } = useParams();
  const id = useId();
  const {
    categoryList,
    defaultTitle,
    defaultContents,
    categoryUseYn,
    secretUseYn,
    fileUploadUseYn,
    scoreUseYn,
    id: managementId,
  } = useContext(BbsContext);
  const [post, setPost] = useState<postRequestProps>(INITIAL_POST);
  useEffect(
    function settingPost() {
      setPost((prev: any) => ({
        ...prev,
        title: defaultTitle || defaultPost?.title || "",
        contents: defaultContents || defaultPost?.contents || "",
        categoryId: defaultPost?.categoryId || 0,
        secret: defaultPost?.secretYn === "Y" ? true : false,
        fileList: defaultPost?.fileList || [],
        deleteFileId: [],
        scrore: 5,
      }));

      return () => {
        setPost(INITIAL_POST);
      };
    },
    [defaultContents, defaultPost, defaultTitle]
  );
  return (
    <form
      onSubmit={() =>
        createPost({
          post,
          username: Cookies.get("username") || "",
          managementId: managementId || 0,
          articleId: articleId ? Number(articleId) : undefined,
          parentId:
            type === BOARD_TYPES.REPLY && articleId
              ? Number(articleId)
              : undefined,
        })
      }
    >
      <div>
        <label htmlFor={id + "title"}>제목</label>
        <Input
          value={post.title || ""}
          onChange={(value) => {
            setPost((prev) => ({
              ...prev,
              title: value,
            }));
          }}
          id={id + "title"}
        />
      </div>
      {categoryUseYn === "Y" && (
        <div>
          <label htmlFor={id + "category"}>카테고리</label>
          <Select
            value={post.categoryId}
            id={id + "category"}
            onChange={(value) => {
              setPost({
                ...post,
                categoryId: value as number,
              });
            }}
            options={categoryList.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
      )}
      {scoreUseYn === "Y" && (
        <div>
          <label htmlFor={id + "category"}>평점</label>
          <RadioGroup
            options={Array.from({ length: 5 }, (_, i) => ({
              label: i + 1 + "점",
              value: i + 1,
            }))}
            value={post.score}
            onChange={(value) => {
              setPost({
                ...post,
                score: value as number,
              });
            }}
          />
        </div>
      )}
      <div>
        <label htmlFor={id + "contents"}>내용</label>
        <Textarea
          value={post.contents}
          onChange={(value) => {
            setPost({
              ...post,
              contents: value,
            });
          }}
          id={id + "contents"}
        />
      </div>
      {secretUseYn === "Y" && (
        <div>
          <label htmlFor={id + "secret"}>비밀글</label>
          <Checkbox
            checked={post.secret}
            onChange={(checked) => {
              setPost({
                ...post,
                secret: checked,
              });
            }}
            id={id + "secret"}
          />
        </div>
      )}
      {fileUploadUseYn === "Y" && (
        <div>
          <label htmlFor={id + "file"}>파일</label>
          <Photo
            files={post.fileList || []}
            setFiles={(files) => {
              setPost((prev: any) => ({
                ...prev,
                fileList: files,
              }));
            }}
            id={id + "file"}
            deleteFileId={post.deleteFileId}
            setDeleteFileId={(ids) => {
              setPost((prev: any) => ({
                ...prev,
                deleteFileId: ids,
              }));
            }}
          />
        </div>
      )}
      <button type="submit">작성</button>
    </form>
  );
}
BbsForm.displayName = "BbsForm";
