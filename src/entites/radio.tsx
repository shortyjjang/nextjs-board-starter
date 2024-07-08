import { useId } from "react";

function Radio({
  value,
  onChange,
  options,
  readOnly,
  disabled,
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  options: { label: string; value: string | number }[];
  readOnly?: boolean;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <ul className="absolute top-full -left-px w-full bg-white border border-black box-content py-6">
      {options.map((option) => (
        <li key={option.value}>
          <input
            type="radio"
            id={id + option.value}
            checked={option.value === value}
            value={option.value}
            onChange={(e) => {
              onChange(e.target.checked ? option.value : "");
            }}
            readOnly={readOnly}
            disabled={disabled}
          />
          <label htmlFor={id + option.value}>{option.label}</label>
        </li>
      ))}
    </ul>
  );
}
export default Radio;
