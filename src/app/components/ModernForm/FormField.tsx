"use client";

import { EyeIcon, EyeSlashIcon } from "@/app/icons";
import type { FormFieldProps } from "@/app/types/types";
import stylex from "@stylexjs/stylex";
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
      <div {...stylex.props(styles["input-container"], styles.ic2)}>
        <input
          autoComplete="new-password"
          type={inputType}
          {...stylex.props(styles.input)}
          {...register(name)}
        />

        {isPasswordInput && (
          <i onClick={handleShowPassword} {...stylex.props(eye.eye)}>
            {" "}
            {inputIcon}
          </i>
        )}

        <div {...stylex.props(styles.cut, styles.labelWidth(labelWidth))} />

        <label {...stylex.props(styles.placeholder)}>{label}</label>
      </div>

      {error && <span {...stylex.props(styles.error)}>{error.message}</span>}
    </>
  );
};

const eye = stylex.create({
  eye: {
    position: "absolute",
    top: "36%",
    right: "4%",
    cursor: "pointer",
  },
});

const styles = stylex.create({
  labelWidth: (width) => ({
    width,
  }),
  error: {
    color: "tomato",
  },
  "input-container": {
    height: "50px",
    position: "relative",
    width: "100%",
  },
  ic2: {
    marginTop: "30px",
  },
  placeholder: {
    color: "#dc2f55",
    fontFamily: "sans-serif",
    left: "20px",
    lineHeight: "14px",
    pointerEvents: "none",
    position: "absolute",
    transformOrigin: "0 50%",
    transition: "transform 200ms, color 200ms",
    top: "20px",
    transform: "translateY(-30px) translateX(10px) scale(0.75)",
  },
  input: {
    backgroundColor: "#303245",
    borderRadius: "12px",
    border: 0,
    boxSizing: "border-box",
    color: "#eee",
    fontSize: "18px",
    height: "100%",
    outline: 0,
    padding: "4px 20px 0",
    width: "100%",
  },
  cut: {
    backgroundColor: "#15172b",
    borderRadius: "10px",
    height: "20px",
    left: "20px",
    position: "absolute",
    top: "-20px",
    transition: "transform 200ms",
    transform: "translateY(8px)",
  },
});
