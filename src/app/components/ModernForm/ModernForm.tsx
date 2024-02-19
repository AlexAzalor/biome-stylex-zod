"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useState } from "react";
import { useForm } from "react-hook-form";

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
    // mode: "all",
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
    <div className="flex items-center gap-3 font-bold text-[orange]">
      <UserInfo {...user} />
      {isSubmitting && <Spinner />}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="bg-[#15172b] rounded-[20px] box-border h-max p-5 w-[320px]">
          <div className="text-[#eee] text-4xl font-semibold">Modern Form</div>
          <div className="text-[#eee] text-base font-semibold pt-2">
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
            labelWidth={56}
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
            labelWidth={126}
          />

          <CheckboxField register={register} error={errors.terms} />

          <button
            type="submit"
            className="bg-[#08d] rounded-xl border-0 text-[#eee] cursor-pointer text-lg h-12 mt-7 text-center w-full transition-all duration-200 active:bg-[#06b] hover:bg-[#03e9f4] hover:text-white hover:rounded-md
          hover:shadow-buttonShadow"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
