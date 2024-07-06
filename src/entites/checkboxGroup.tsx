import React, { useId } from "react";
import Checkbox from "./checkbox";

export default function CheckboxGroup({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const id = useId();
  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          <Checkbox
            id={id + option.value}
            checked={value.some((v) => v === option.value)}
            onChange={(checked) =>
              onChange(
                checked
                  ? [...value, option.value]
                  : value.filter((v) => v !== option.value)
              )
            }
          />
          <label htmlFor={id + option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
}
