import React, { forwardRef } from "react";

function Input(
  {
    onChange,
    value,
    id,
    readOnly,
    disabled,
    placehoder,
    ...HTMLInputElementProps
  }: {
    onChange: (value: string) => void;
    value: string;
    id?: string;
    readOnly?: boolean;
    disabled?: boolean;
    placehoder?: string;
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
      readOnly={readOnly}
      disabled={disabled}
      id={id}
      placeholder={placehoder}
    />
  );
}
export default forwardRef(Input);
