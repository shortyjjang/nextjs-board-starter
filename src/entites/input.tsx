import  { forwardRef, InputHTMLAttributes, Ref } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

function Input(
  {
    onChange,
    value,
    id,
    ...HTMLInputElementProps
  }: InputProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...HTMLInputElementProps}
    />
  );
}
export default forwardRef(Input);
