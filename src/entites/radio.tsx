import { InputHTMLAttributes, useId } from "react";

interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string | number) => void;
}

function Radio({ 
  onChange,
  ...HTMLInputElementProps
 }: RadioProps) {
  const id = useId();
  return (
    <input
      type="radio"
      onChange={(e) => {
        onChange(e.target.checked ? e.target.value : "");
      }}
      {...HTMLInputElementProps}
    />
  );
}
Radio.displayName = "Radio";
export default Radio;
