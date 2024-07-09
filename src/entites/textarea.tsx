import  { forwardRef, Ref, TextareaHTMLAttributes } from "react";

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  onChange: (value: string) => void;
}

function Textarea(
  { onChange, ...HTMLInputElementProps }: TextareaProps,
  ref: Ref<HTMLTextAreaElement>
) {
  return (
    <textarea
      ref={ref}
      onChange={(e) => onChange(e.target.value)}
      {...HTMLInputElementProps}
    />
  );
}
Textarea.displayName = "Textarea";
export default forwardRef(Textarea);
