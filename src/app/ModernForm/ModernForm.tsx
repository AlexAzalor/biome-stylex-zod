"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import stylex from "@stylexjs/stylex";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserInfo } from "../PrimitiveForm/UserInfo";
import { Spinner } from "../Spinner";
import { FormData, ValidFieldNames } from "../types";
import { UserSchema } from "../types/zod-scheme";
import { FormField } from "./FormField";

export type FormError = {
  name: string | null;
  email: string | null;
  phone: string | null;
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
    age: 0,
    url: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    console.log("SUCCESS", data);

    try {
      setLoading(true);
      // // Data sent in axios with incorrect data
      // const response2 = await axios.post("/api/form", {
      //   name: 1234,
      //   email: "Not an email",
      //   url: "Not a URL",
      //   age: "Hello",
      //   password: 1234,
      //   confirmPassword: 12345,
      //   terms: false,
      // }); // Make a POST request
      // console.log("response2", response2);

      const response = await axios.post("/api/form", data);
      console.log("response", response);

      const { errors = {} } = response.data;

      // Define a mapping between server-side field names and their corresponding client-side names
      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        name: "name",
        email: "email",
        url: "url",
        age: "age",
        password: "password",
        confirmPassword: "confirmPassword",
        terms: "terms",
      };

      // Find the first field with an error in the response data
      const fieldWithError = Object.keys(fieldErrorMapping).find(
        (field) => errors[field],
      );

      // If a field with an error is found, update the form error state using setError
      if (fieldWithError) {
        // Use the ValidFieldNames type to ensure the correct field names
        setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: errors[fieldWithError],
        });
      }
      setUser({
        name: data.name,
        email: data.email,
        age: data.age,
        url: data.url,
      });
      setLoading(false);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      setLoading(false);
      console.log("error", error);

      alert("Submitting form failed!");
    }
  };

  return (
    <div {...stylex.props(styles.text)}>
      <UserInfo {...user} />
      {loading && <Spinner />}

      <form onSubmit={handleSubmit(onSubmit)} {...stylex.props(styles.flex)}>
        <div {...stylex.props(styles.form)}>
          <div {...stylex.props(styles.title)}>Modern Form</div>
          <div {...stylex.props(styles.subtitle)}>Zod + React Hook Form</div>

          <FormField
            type="text"
            label="Name"
            name="name"
            register={register}
            error={errors.name}
            labelWidth={52}
          />

          <FormField
            type="email"
            label="Email"
            name="email"
            register={register}
            error={errors.email}
            labelWidth={50}
          />
          <FormField
            type="text"
            label="Phone"
            name="phone"
            register={register}
            error={errors.phone}
            labelWidth={54}
          />

          <FormField
            type="text"
            label="Age"
            name="age"
            register={register}
            error={errors.age}
            valueAsNumber
            labelWidth={42}
          />

          <FormField
            type="text"
            label="Website URL"
            name="url"
            register={register}
            error={errors.url}
            labelWidth={94}
          />

          {/* no copy */}
          <FormField
            type="password"
            label="Password"
            name="password"
            register={register}
            error={errors.password}
            labelWidth={76}
          />

          <FormField
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
            labelWidth={124}
          />

          <div {...stylex.props(styles.terms)}>
            <label {...stylex.props(styles.termsLabel)}>
              <input
                type="checkbox"
                {...register("terms", { required: true })}
              />
              I agree to the terms and conditions
            </label>
            {errors.terms && (
              <div {...stylex.props(styles.error)}>
                You must agree to the terms and conditions
              </div>
            )}
          </div>

          <button type="submit" {...stylex.props(styles.submit)}>
            Submit
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
