

type PostProps = {
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
};

type PostProps = {
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
};

interface BoardContextProps {
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