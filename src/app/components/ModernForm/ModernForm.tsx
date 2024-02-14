"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import stylex from "@stylexjs/stylex";
import axios from "axios";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { formStyles } from "@/app/styles/form-styles";
import type { FormRequest, TypeUserSchema } from "@/app/types/types";
import { UserSchema } from "@/app/types/zod-scheme";

import { handleResponseError } from "@/app/utils";
import { defaultUserState } from "../PrimitiveForm/PrimitiveForm";
import { Spinner } from "../Spinner";
import { UserInfo } from "../User/UserInfo";
import { CheckboxField } from "./CheckboxField";
import { FormField } from "./FormField";

export const ModernForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TypeUserSchema>({
    resolver: zodResolver(UserSchema),
    // reValidateMode: "onSubmit",
    // delayError: 3000,
    // shouldFocusError: true,
  });

  const [user, setUser] = useState(defaultUserState);

  const onSubmit = async (data: TypeUserSchema) => {
    try {
      const response = await axios.post<TypeUserSchema, FormRequest>(
        "/api/form",
        data,
      );

      const { errors, fieldErrorMapping, fieldWithError } =
        handleResponseError(response);

      if (fieldWithError) {
        setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: errors[fieldWithError],
        });

        return;
      }

      const { name, email, age, url, phone } = response.data.data;
      setUser({
        name,
        email,
        age,
        url,
        phone: phone || "",
      });

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      console.error("Error: ", error);
      alert("Failed to submit Modern Form.");
    }
  };

  return (
    <div {...stylex.props(formStyles.text)}>
      <UserInfo {...user} />
      {isSubmitting && <Spinner />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        {...stylex.props(formStyles.flex)}
      >
        <div {...stylex.props(formStyles.form)}>
          <div {...stylex.props(formStyles.title)}>Modern Form</div>
          <div {...stylex.props(formStyles.subtitle)}>
            Zod + React Hook Form
          </div>

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

          <CheckboxField register={register} error={errors.terms} />

          <button type="submit" {...stylex.props(formStyles.submit)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
