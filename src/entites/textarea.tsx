import React, { forwardRef } from "react";

function Textarea(
  {
    onChange,
    value,
    id,
    readOnly,
    disabled,
    ...HTMLInputElementProps
  }: {
    onChange: (value: string) => void;
    value: string;
    id?: string;
    readOnly?: boolean;
    disabled?: boolean;
  },
  ref: React.Ref<HTMLTextAreaElement>
) {
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...HTMLInputElementProps}
      readOnly={readOnly}
      disabled={disabled}
      id={id}
    />
  );
}
export default forwardRef(Textarea);
