"use client";

import { EyeIcon, EyeSlashIcon } from "@/app/icons";
import type { FormFieldProps } from "@/app/types/types";

import { useState } from "react";

const passwordInputs = ["password", "confirmPassword"];

export const FormField = ({
  type,
  name,
  register,
  error,
  labelWidth,
  label,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordInput = passwordInputs.includes(name);
  const inputType = isPasswordInput && showPassword ? "text" : type;
  const inputIcon = showPassword ? <EyeSlashIcon /> : <EyeIcon />;

  return (
    <>
      <div className="h-[50px] relative w-full mt-7">
        <input
          placeholder=" "
          autoComplete="new-password"
          type={inputType}
          {...register(name)}
          className="input w-full h-full bg-secondary rounded-[12px] border-0 box-border text-[18px] text-whiteText outline-0 px-5 py-1 [&:focus~.placeholder]:translate-y-[-30px] [&:focus~.placeholder]:translate-x-[10px] [&:focus~.placeholder]:scale-75 [&:not(:placeholder-shown)~.placeholder]:translate-y-[-30px] [&:not(:placeholder-shown)~.placeholder]:translate-x-[10px] [&:not(:placeholder-shown)~.placeholder]:scale-75 [&:focus~.cut]:translate-y-[8px] [&:not(:placeholder-shown)~.cut]:translate-y-[8px] [&:not(:placeholder-shown)~.placeholder]:text-textRed [&:focus~.placeholder]:text-textRed"
        />

        {isPasswordInput && (
          <i
            onClick={handleShowPassword}
            className="absolute top-[36%] right-[4%] cursor-pointer"
          >
            {" "}
            {inputIcon}
          </i>
        )}

        <div
          className="cut bg-primary rounded-[10px] h-[20px] absolute left-[20px] top-[-20px] transition-transform duration-200 translate-y-0"
          style={{ width: labelWidth }}
        />

        <label className="placeholder text-textGrey left-5 leading-3 pointer-events-none absolute origin-[0_50%] transition-transform duration-200 top-5">
          {label}
        </label>
      </div>

      {error && (
        <span className="text-textRedLight text-sm">{error.message}</span>
      )}
    </>
  );
};
