import { SEARCH_OPTIONS } from "@/app/enum";
import Input from "@/entites/input";
import Select from "@/entites/select";
import { useState } from "react";


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
      <button type="submit">검색</button>
    </form>
  );
}

BbsListSearchText.displayName = "BbsListSearchText";