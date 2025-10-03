"use client";

import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";

interface IRichTextInputProps {
  name: string;
  control: Control;
  onChangeValue?: (value: string) => void;
  className?: string;
  placeholder?: string;
  label: string;
}

const RichTextInput: React.FC<IRichTextInputProps> = (props) => {
  const { name, control, onChangeValue, className, placeholder, label } = props;
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState: {},
      }) => {
        return (
          <div
            className={`w-full rounded-sm ${
              !!error ? "text-secondary-900" : "text-red-500"
            } `}
          >
            <div className="flex items-center justify-between">
              <div className="flex">
                <p className="text-md mr-1 font-bold text-secondary-900">
                  {label}
                </p>
                {false && <p className="font-bold text-blue-500">*</p>}
              </div>
            </div>
            <div
              className={`mt-1 flex ${
                focus && !error
                  ? "border-2 border-secondary-900"
                  : !!error
                    ? "border-2 border-red-500"
                    : "border border-secondary-800"
              } ${
                focus && !error
                  ? "bg-secondary-50"
                  : error
                    ? "bg-red-50"
                    : "bg-secondary-100"
              } rounded-lg px-2 py-1 ${className}`}
            >
              <textarea
                autoComplete="off"
                placeholder={props.placeholder || ""}
                value={value}
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
                onChange={(e) => onChange(e.target.value)}
                className={`min-h-[100px] w-[100%] px-2 py-1 ${
                  focus && !error
                    ? "border-primary-500 bg-secondary-50"
                    : error
                      ? "bg-red-50"
                      : "bg-secondary-100"
                } h-8 w-80 rounded-lg border-transparent text-sm text-secondary-900 outline-none ring-0 focus:border-transparent focus:outline-transparent focus:ring-0`}
              />
            </div>
            {error && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {error?.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default RichTextInput;
