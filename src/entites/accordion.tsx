import useToggle from "@/shared/hook/useToggle";
import { useRef } from "react";

export function Accordion({ children, title, prevEvent }: { children: React.ReactNode, title: string | React.ReactNode, prevEvent?: () => Promise<boolean>}) {
  const ref = useRef<HTMLDivElement>(null);
  const contents = useToggle();
  return (
    <div>
      <div onClick={() => {
        if (prevEvent && !prevEvent()) return;
        contents.toggle();
      }}>{title}</div>
      <div className="relative overflow-hidden" style={{
        overflow: 'hidden',
        position: 'relative',
        height: contents.visible ? (ref.current?.clientHeight || 0) : 0,
        transition: "height 0.3s ease-in-out",
      }}>
        {children}
        <div ref={ref} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 0,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
