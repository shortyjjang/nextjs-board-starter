import useToggle from "@/shared/hook/useToggle";
import React, { forwardRef } from "react";

function Select(
  {
    value,
    onChange,
    options,
  }: {
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
  },
  ref: React.Ref<HTMLInputElement>
) {
  const dropdown = useToggle();
  return (
    <div>
      <span className="relative">
        <i className="absolute w-4 h-4 border-r border-b border-black rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
        <input
          value={value}
          readOnly
          className="w-full h-full px-10 py-6 cursor-pointer bg-white border border-black"
          onClick={dropdown.toggle}
          ref={ref}
        />
      </span>
      {dropdown.visible && (
        <ul className="absolute top-full -left-px w-full bg-white border border-black box-content py-6">
          {options.map(({ label, value }) => (
            <li
              key={value}
              className="cursor-pointer px-10 py-6 hover:underline text-graycolor hover:text-black"
              onClick={() => {
                onChange(value);
                dropdown.toggle();
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default forwardRef(Select);
