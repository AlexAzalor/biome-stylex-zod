"use client";

import stylex from "@stylexjs/stylex";
import { useState } from "react";
import { FormInput } from "../PrimitiveForm/FormInput";
import { UserInfo } from "../PrimitiveForm/UserInfo";
import {
  validateAge,
  validateEmail,
  validateName,
  validatePassword,
  validateURL,
} from "../utils";

export type FormError = {
  name: string | null;
  email: string | null;
  age: string | null;
  url: string | null;
  password: string | null;
  confirmPassword: string | null;
  terms: string | null;
};

export const ModernForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    url: "",
  });

  const [error, setError] = useState<FormError>({
    name: null,
    email: null,
    age: null,
    url: null,
    password: null,
    confirmPassword: null,
    terms: null,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const age = data.get("age") as string;
    const url = data.get("url") as string;
    const password = data.get("password") as string;
    const confirm = data.get("confirm") as string;
    const terms = data.get("terms") as string;

    const validName = validateName(name);
    console.log(validName);

    if (validName === "Name is valid") {
      setError((prev) => ({ ...prev, name: null }));
    } else {
      setError((prev) => ({ ...prev, name: validName }));
      return;
    }

    const validEmail = validateEmail(email);

    if (validEmail) {
      setError((prev) => ({ ...prev, email: null }));
    } else {
      setError((prev) => ({ ...prev, email: "Email is invalid" }));
      return;
    }

    const validAge = validateAge(Number(age));

    if (validAge === "Age is valid") {
      setError((prev) => ({ ...prev, age: null }));
    } else {
      setError((prev) => ({ ...prev, age: validAge }));
      return;
    }

    const validUrl = validateURL(url);

    if (validUrl === "URL is valid") {
      setError((prev) => ({ ...prev, url: null }));
    } else {
      setError((prev) => ({ ...prev, url: validUrl }));
      return;
    }

    const validPassword = validatePassword(password);

    if (validPassword === "Password is valid") {
      setError((prev) => ({ ...prev, password: null }));
    } else {
      setError((prev) => ({ ...prev, password: validPassword }));
      return;
    }

    if (confirm === password) {
      setError((prev) => ({ ...prev, confirmPassword: null }));
    } else {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    if (terms === "on") {
      setError((prev) => ({ ...prev, terms: null }));
    } else {
      setError((prev) => ({ ...prev, terms: "Please agree to the terms" }));
      return;
    }

    setUser({ name, email, age, url });
  };

  return (
    <div {...stylex.props(styles.text)}>
      <UserInfo {...user} />
      <form onSubmit={handleSubmit} {...stylex.props(styles.flex)}>
        <div {...stylex.props(styles.form)}>
          <div {...stylex.props(styles.title)}>Modern Form</div>
          <div {...stylex.props(styles.subtitle)}>React Hook Form + Zod</div>

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
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

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
