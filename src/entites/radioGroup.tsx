import  { InputHTMLAttributes, useId } from "react";
import Radio from "./radio";

interface RadioGroupProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string | number) => void;
  options: { label: string; value: string | number }[];
}

export default function RadioGroup({
  value,
  onChange,
  options,
  readOnly,
  disabled,
}: RadioGroupProps) {
  const id = useId();
  return (
    <ul className="absolute top-full -left-px w-full bg-white border border-black box-content py-6">
      {options.map((option) => (
        <li key={option.value}>
          <Radio
            id={id + option.value}
            checked={option.value === value}
            value={option.value}
            onChange={onChange}
            readOnly={readOnly}
            disabled={disabled}
          />
          <label htmlFor={id + option.value}>{option.label}</label>
        </li>
      ))}
    </ul>
  );
}
RadioGroup.displayName = "RadioGroup";
