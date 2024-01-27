"use client";

import stylex from "@stylexjs/stylex";
import { useState } from "react";
import { simulateApiRequest } from "../api/api";
import type { User } from "../types";
import {
  validateAge,
  validateEmail,
  validateName,
  validatePassword,
  validateURL,
} from "../utils";
import { FormInput } from "./FormInput";
import { UserInfo } from "./UserInfo";

export type FormError = {
  name: string | null;
  email: string | null;
  age: string | null;
  url: string | null;
  password: string | null;
  confirmPassword: string | null;
  terms: string | null;
};

const defaultErrorState: FormError = {
  name: null,
  email: null,
  age: null,
  url: null,
  password: null,
  confirmPassword: null,
  terms: null,
};

const defaultUserState: User = {
  name: "",
  email: "",
  age: "",
  url: "",
};

export const PrimitiveForm = () => {
  const [user, setUser] = useState<User>(defaultUserState);
  const [error, setError] = useState<FormError>(defaultErrorState);
  const [loading, setLoading] = useState(false);

  const handleVerify = (
    type: string,
    message: string,
    approveMessage: string,
    specialMessage?: string,
  ) => {
    if (message === approveMessage) {
      setError((prev) => ({ ...prev, [type]: null }));
      return false;
    }

    setError((prev) => ({ ...prev, [type]: specialMessage || message }));
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = (data.get("name") as string).trim();
    const email = (data.get("email") as string).trim();
    const age = (data.get("age") as string).trim();
    const url = (data.get("url") as string).trim();
    const password = (data.get("password") as string).trim();
    const confirm = (data.get("confirm") as string).trim();
    const terms = data.get("terms") as string;

    const validName = validateName(name);
    const isNameVerified = handleVerify("name", validName, "Name is valid");

    const validEmail = validateEmail(email);
    const isEmailVerified = handleVerify("email", validEmail, "Email is valid");

    const validAge = validateAge(Number(age));
    const isAgeVerified = handleVerify("age", validAge, "Age is valid");

    const validUrl = validateURL(url);
    const isURLVerified = handleVerify("url", validUrl, "URL is valid");

    const validPassword = validatePassword(password);
    const isPasswrodVerified = handleVerify(
      "password",
      validPassword,
      "Password is valid",
    );

    const isPasswordConfirm = handleVerify(
      "confirmPassword",
      confirm,
      password,
      "Passwords do not match",
    );

    const isTermsCheck = handleVerify(
      "terms",
      terms,
      "on",
      "Please agree to the terms",
    );

    if (
      isNameVerified ||
      isEmailVerified ||
      isAgeVerified ||
      isURLVerified ||
      isPasswrodVerified ||
      isPasswordConfirm ||
      isTermsCheck
    ) {
      return;
    }

    try {
      setLoading(true);
      const response = await simulateApiRequest({ name, email, age, url });

      setLoading(false);
      setUser(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div {...stylex.props(styles.text)}>
      <form onSubmit={handleSubmit} {...stylex.props(styles.flex)}>
        <div {...stylex.props(styles.form)}>
          <div {...stylex.props(styles.title)}>Primitive Form</div>
          <div {...stylex.props(styles.subtitle)}>
            Only vanilla React with TypeScript
          </div>

          <FormInput
            label="Name"
            code="name"
            type="text"
            labelWidth={52}
            error={error.name}
          />

          <FormInput
            label="Email"
            code="email"
            type="text"
            labelWidth={50}
            error={error.email}
          />

          <FormInput
            label="Age"
            code="age"
            type="text"
            labelWidth={42}
            error={error.age}
          />

          <FormInput
            label="Website URL"
            code="url"
            type="text"
            labelWidth={94}
            error={error.url}
          />

          <FormInput
            label="Password"
            code="password"
            type="text"
            labelWidth={76}
            error={error.password}
          />

          <FormInput
            label="Confirm password"
            code="confirm"
            type="text"
            labelWidth={124}
            error={error.confirmPassword}
          />

          <div {...stylex.props(styles.terms)}>
            <label {...stylex.props(styles.termsLabel)} htmlFor="terms">
              <input id="terms" type="checkbox" name="terms" />
              <span>I agree to the terms and conditions</span>
            </label>
            {error.terms && (
              <div {...stylex.props(styles.error)}>{error.terms}</div>
            )}
          </div>

          <button type="submit" {...stylex.props(styles.submit)}>
            Submit
          </button>
        </div>
      </form>

      <div {...stylex.props(loading ? spinner.icon : null)} />

      <UserInfo {...user} />
    </div>
  );
};

const rotate = stylex.keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const spinner = stylex.create({
  icon: {
    display: "inline-block",
    width: "80px",
    height: "80px",
    "::after": {
      content: '""',
      display: "block",
      width: "64px",
      height: "64px",
      margin: "8px",
      borderRadius: "50%",
      border: "6px solid #fff",
      borderColor: "#fff transparent #fff transparent",
      animation: `${rotate} 1.2s linear infinite`,
    },
  },
});

const styles = stylex.create({
  text: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: "bold",
    color: "orange",
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  error: {
    color: "tomato",
  },
  form: {
    backgroundColor: "#15172b",
    borderRadius: "20px",
    boxSizing: "border-box",
    height: "max-content",
    padding: "20px",
    width: "320px",
  },
  title: {
    color: "#eee",
    fontFamily: "sans-serif",
    fontSize: "36px",
    fontWeight: 600,
    marginTop: "30px",
  },
  subtitle: {
    color: "#eee",
    fontFamily: "sans-serif",
    fontSize: "16px",
    fontWeight: 600,
    marginTop: "10px",
  },

  submit: {
    backgroundColor: "#08d",
    borderRadius: "12px",
    border: 0,
    boxSizing: "border-box",
    color: "#eee",
    cursor: "pointer",
    fontSize: "18px",
    height: "50px",
    marginTop: "28px",
    textAlign: "center",
    width: "100%",
    transition: "all 0.3s ease-in-out",
    ":active": {
      backgroundColor: "#06b",
    },
    ":hover": {
      background: "#03e9f4",
      color: "#fff",
      borderRadius: "5px",
      boxShadow:
        "0 0 5px #47aeee,0 0 6px #47aeee,0 0 26px #47aeee,0 0 28px #47aeee",
    },
  },
  terms: {
    textAlign: "left",
    marginTop: "20px",
  },
  termsLabel: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    padding: "4px",
  },
});
