import clsx from "clsx";
import { type JSX, useEffect, useState } from "react";

type TTextAreaField = {
  id: string;
  label?: string;
  minRows?: number;
  maxRows?: number;
  hasError?: boolean;
  className?: string;
  helperText?: string;
  placeholder?: string;
  endIcon?: JSX.Element;
  color?: "primary" | "";
  startIcon?: JSX.Element;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  helperProps?: React.HTMLAttributes<HTMLParagraphElement>;
  textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

const TextAreaField = ({
  id = "",
  endIcon,
  startIcon,
  label = "",
  color = "",
  minRows = 3,
  maxRows = 8,
  className = "",
  helperText = "",
  hasError = false,
  placeholder = "",
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",
  helperClassName = "",
  labelProps = {},
  helperProps = {},
  textAreaProps: { rows, onChange, ...rest } = {},
}: TTextAreaField) => {
  const [r, setR] = useState(rows || minRows);

  useEffect(() => {
    calculateRows(rest.value as string);
  }, [minRows, maxRows]);

  const calculateRows = (textareaValue: string = "") => {
    const lineCount = textareaValue?.split("\n").length + 1 || 0;
    const calculatedRows = Math.min(maxRows, Math.max(minRows, lineCount));
    setR(calculatedRows);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    calculateRows(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const borderColorCn = rest.disabled
    ? "border-gray-500 opacity-60 cursor-not-allowed"
    : hasError
    ? "border-th-e-m"
    : color === "primary"
    ? "border-th-p-m"
    : "";

  return (
    <div className={clsx("", className)}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            "block mb-1 text-sm font-medium ",
            {
              "text-th-e-m": hasError,
              "text-gray-900 dark:text-gray-700": !hasError,
            },
            labelClassName
          )}
          {...labelProps}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            {startIcon}
          </div>
        )}
        <textarea
          id={id}
          rows={r}
          onChange={handleChange}
          placeholder={placeholder}
          // style={{
          //   minHeight: `${minRows * 1.5}rem`,
          //   maxHeight: `${maxRows * 1.5}rem`,
          // }}
          className={clsx(
            "resize-none c-scrollbar dark:text-black",
            borderColorCn,
            inputClassName,
            {
              "pl-9": Boolean(startIcon),
              "pr-7": Boolean(endIcon),
            }
          )}
          {...rest}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 ">
            {endIcon}
          </div>
        )}
      </div>
      {helperText && (
        <p
          className={clsx(
            "text-xs pl-2 italic mt-0.5",
            {
              "text-th-e-m": hasError,
              "text-gray-500": !hasError,
            },
            hasError ? errorClassName : helperClassName
          )}
          {...helperProps}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export { TextAreaField };
