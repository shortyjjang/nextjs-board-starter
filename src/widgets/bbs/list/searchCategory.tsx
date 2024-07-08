import Select from "@/entites/select";

export default function BbsSearchCategory({
  options,
  setParams,
  categoryId,
}: {
  options: { label: string; value: string | number }[];
  setParams: React.Dispatch<React.SetStateAction<boardListRequestProps>>;
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
