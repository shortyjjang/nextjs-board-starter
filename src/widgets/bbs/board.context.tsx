import { createContext } from "react";

export const BbsContext = createContext<bbsContextProps>(
  {} as bbsContextProps
);
export const BbsListContext = createContext<bbsListContextProps>({
  lists: [],
  totalCount: 0,
  totalPagesCount: 0,
  currentPage: 0,
});
