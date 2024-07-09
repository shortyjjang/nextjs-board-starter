import Select from "@/entites/select";
import { Dispatch, SetStateAction } from "react";

export default function BbsSearchCategory({
  options,
  setParams,
  categoryId,
}: {
  options: { label: string; value: string | number }[];
  setParams: Dispatch<SetStateAction<boardListRequestProps>>;
  categoryId: number;
}) {
  return (
    <Select
      options={options}
      value={categoryId}
      addAllOption
      onChange={(value) => {
        setParams((prev: boardListRequestProps) => {
          if (value === "") {
            delete prev.categoryId;
            return prev;
          }
          return {
            ...prev,
            categoryId: value as number,
          };
        });
      }}
    />
  );
}
BbsSearchCategory.displayName = "BbsSearchCategory";