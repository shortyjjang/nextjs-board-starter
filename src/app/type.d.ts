interface postProps {
  id: string;
  managementId: number;
  categoryId: number;
  title: string;
  viewCount: number;
  secretYn: string;
  voteCount: number;
  createBy: string;
  createTime: string;
  contents: string;
  isVoted: boolean;
  isEditable: boolean;
  fileList: [];
  commentList: [];
  score?: number;
};


interface bbsContextProps {
  id: number;
  name: string;
  markType: string;
  guide: string;
  useProductYn: string;
  replyUseYn: string;
  sortType: string;
  nameMarkType: string;
  defaultTitleUseYn: string;
  defaultTitle: string;
  defaultContentsUseYn: string;
  defaultContents: string;
  viewCountUseYn: string;
  listContentsMarkUseYn: string;
  registerTimeUseYn: string;
  writeRole: string;
  readRole: string;
  fileUploadUseYn: string;
  scoreUseYn: string;
  voteUseYn: string;
  commentUseYn: string;
  replyCommentUseYn: string;
  categoryUseYn: string;
  secretUseYn: string;
  categoryList: {
    id: number;
    name: string;
  }[];
  reviewPoint: {};
}
type boardListRequestProps = {
  categoryId?: number;
  contents?: string;
  endDate?: string;
  managementId: number;
  page: number;
  productId?: number;
  registerId?: string;
  registerName?: string;
  registerNickname?: string;
  rows: number;
  startDate?: string;
  title?: string;
  isBestYn?: "Y" | "N";
};
interface boardListType {
  articleId: string;
  managementId: 7;
  parentId: string;
  title: string;
  voteCount: number;
  secretYn: string;
  createBy: string;
  createTime: string;
  notificationYn: "N" | "Y";
  newPostYn: "N" | "Y";
  questionStatus: "N" | "Y";
  depth: number;
  categoryId: number;
  viewCount: number;
};

type boardType = "LIST" | "VIEW" | "WRITE" | "EDIT" | "REPLY";

type fetchType = "FETCH_INIT" | "FETCH_SUCCESS" | "FETCH_FAILURE";
type fetchState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: any;
};

type pagingState = {
  currentPage: number;
  totalCount: number;
  totalPagesCount: number;
  lists: any[];
}
type bbsListContextProps = {
  lists: boardListType[];
  totalCount: number;
  totalPagesCount: number;
  currentPage: number;
};
type listSearchType = "title" | "contents" | "registerName" | "registerId";

type imagePathType = {
  name: string;
  size: number;
  previewPath?: string;
  id: number;
  managementId?: number;
  articleId?: string;
  path?: string;
  ext?: string;
  answerFileYn?: string;
};

type photoProps = {
  files: File[];
  setFiles: (files: File[]) => void;
  deleteFileId?: number[];
  setDeleteFileId?: (deleteFileId: number[]) => void;
  id?: string;
  readOnly?: boolean;
  disabled?: boolean;
  maxSize?: number;
}