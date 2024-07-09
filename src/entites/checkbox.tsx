import  { forwardRef, InputHTMLAttributes, Ref } from "react";

interface CheckBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked?: boolean;
  onChange?: (checked: boolean) => void | undefined; // onChange 핸들러 타입 변경
}

function CheckBox(
  {
    checked,
    onChange,
    ...HTMLInputElementProps
  }:CheckBoxProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <span
      className={`relative inline-block border w-[16px] h-[16px] rounded-full ${
        checked ? "bg-[#009e48] border-[#009e48]" : "bg-white border-gray-300"
      }`}
    >
      {checked &&<span className="absolute w-[7px] h-[12px] top-[2px] left-[4px] border-b-[2px] border-r-[2px] transform rotate-45 border-white"></span>}
      <input
        ref={ref}
        type="checkbox"
        className="absolute top-0 left-0 w-full h-full"
        {...HTMLInputElementProps}
        onChange={(e) => {
          if (onChange) onChange(e.target.checked);
        }}
      />
    </span>
  );
}
CheckBox.displayName = "CheckBox";

export default forwardRef(CheckBox);
