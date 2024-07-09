import  { ButtonHTMLAttributes, forwardRef, ReactNode, MouseEvent, Ref } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  styleType?: "default" | "primary" | "secondary";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

function Button(
  {
    children,
    onClick,
    styleType = "default",
    size = "md",
    className = "",
    ...HTMLButtonElementProps
  }: ButtonProps,
  ref?: Ref<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      {...HTMLButtonElementProps}
      className={`
        whitespace-nowrap
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
Button.displayName = "Button";

export default forwardRef(Button);
