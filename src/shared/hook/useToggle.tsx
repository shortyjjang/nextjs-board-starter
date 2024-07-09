import  { useCallback, useState } from "react";

export default function useToggle() {
  const [visible, setVisible] = useState(false);
  const toggle = useCallback(() => setVisible((prev) => !prev), []);
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  return { visible, toggle, show, hide };
}
