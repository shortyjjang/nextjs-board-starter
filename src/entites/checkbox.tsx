import React, { forwardRef, useId } from "react";

function CheckBox(
  {
    checked = false,
    onChange,
    id,
    ...HTMLInputElementProps
  }: {
    checked?: boolean;
    id?: string;
    onChange?: (checked: boolean) => void;
  },
  ref: React.Ref<HTMLInputElement>
) {
  const valueId = useId();
  return (
    <span
      className={`relative inline-block border w-[16px] h-[16px] rounded-full ${
        checked ? "bg-[#009e48] border-[#009e48]" : "bg-white border-gray-300"
      }`}
    >
      {checked &&<span className="absolute w-[7px] h-[12px] top-[2px] left-[4px] border-b-[2px] border-r-[2px] transform rotate-45 border-white"></span>}
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="absolute top-0 left-0 w-full h-full"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
    </span>
  );
}

export default forwardRef(CheckBox);
