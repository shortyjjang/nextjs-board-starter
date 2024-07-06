import React, { forwardRef } from "react";

function Button(
  {
    children,
    onClick,
    styleType = "default",
    size = "md",
    className = "",
    ...HTMLButtonElementProps
  }: {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    styleType?: "default" | "primary" | "secondary";
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
  },
  ref?: React.Ref<HTMLButtonElement>
) {
  const styleTypeClass = () => {
    switch (styleType) {
      case "primary":
        return "bg-black text-white";
      case "secondary":
        return "bg-[#ffd900] border border-black text-black";
      default:
        return "border border-gray-300 text-black";
    }
  };
  const sizeTypeClass = () => {
    switch (size) {
      case "sm":
        return "text-[13px] px-[8px] py-[5px]";
      case "lg":
        return "text-[15px] font-bold px-[16px] py-[12px]";
      case "xl":
        return "text-[22px] font-bold px-[30px] py-[20px]";
      default:
        return "";
    }
  };
  return (
    <button
      ref={ref}
      {...HTMLButtonElementProps}
      className={`
        whitespace-nowrap
        ${styleTypeClass()}
        ${sizeTypeClass()}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default forwardRef(Button);
