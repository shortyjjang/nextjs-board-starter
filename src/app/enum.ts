export const BOARD_TYPES: {
    LIST: 'LIST';
    VIEW: 'VIEW';
    WRITE: 'WRITE';
    EDIT: 'EDIT';
    REPLY: 'REPLY';
} = {
    LIST: 'LIST',
    VIEW: 'VIEW',
    WRITE: 'WRITE',
    EDIT: 'EDIT',
    REPLY: 'REPLY',
}
export const FETCH_TYPE = {
  FETCH_INIT: "FETCH_INIT",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
};


export const SEARCH_OPTIONS = [
  { label: "제목", value: "title" },
  { label: "내용", value: "contents" },
  { label: "작성자명", value: "registerName" },
  { label: "작성자아이디", value: "registerId" },
];