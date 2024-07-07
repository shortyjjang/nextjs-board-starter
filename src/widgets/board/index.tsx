
import useQuery from "@/shared/hook/useQuery";
import { useRouter } from "next/navigation";
import { createContext, useEffect } from "react";


export const BoardContext = createContext<BoardContextProps>({} as BoardContextProps);

export default function BoardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const {
    data: bbsInfo,
    error,
  }: {
    data: BoardContextProps;
    error: string;
    refetch: () => void;
  } = useQuery({
    url: `/api/board/v1/management/${2}`,
    method: "GET",
  });
  useEffect(() => {
    if (!error) return;
    alert(error);
    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  return (
    <BoardContext.Provider
      value={{
        ...bbsInfo,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
