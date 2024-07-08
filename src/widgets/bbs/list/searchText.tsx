import Input from "@/entites/input";
import Select from "@/entites/select";
import { useState } from "react";

const SEARCH_OPTIONS = [
  { label: "제목", value: "title" },
  { label: "내용", value: "contents" },
  { label: "작성자명", value: "registerName" },
  { label: "작성자아이디", value: "registerId" },
];

export default function BbsListSearchText({
  searchList,
}: {
  searchList: (key: listSearchType, value: string) => void;
}) {
  const [searchType, setSearchType] = useState<listSearchType>("title");
  const [keyword, setKeyword] = useState<string>("");
  return (
    <form onSubmit={() => searchList(searchType, keyword)}>
      <Select
        options={SEARCH_OPTIONS}
        value={searchType || ""}
        onChange={(value) => {
          setSearchType(value as listSearchType);
        }}
      />
      <Input
        value={keyword}
        onChange={(value) => {
          setKeyword(value);
        }}
      />
    </form>
  );
}
