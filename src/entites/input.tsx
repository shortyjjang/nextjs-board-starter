import React, { forwardRef } from "react";

function Input(
  {
    onChange,
    value,
    ...HTMLInputElementProps
  }: {
    onChange: (value: string) => void;
    value: string;
  },
  ref: React.Ref<HTMLInputElement>
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
