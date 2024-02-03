import { FieldError, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { UserSchema } from "./zod-scheme";

export type TypeUserSchema = z.infer<typeof UserSchema>;

export type User = {
  name: string;
  email: string;
  age: number;
  url: string;
  phone: string;
};

export type ApiResponse<T> = {
  data: T;
};

export type FormFieldProps = {
  type: string;
  name: ValidFieldNames;
  register: UseFormRegister<TypeUserSchema>;
  error: FieldError | undefined;
  labelWidth?: number;
  label: string;
};

export type ValidFieldNames =
  | "name"
  | "email"
  | "phone"
  | "age"
  | "url"
  | "password"
  | "confirmPassword"
  | "terms";

export type FormError = {
  name: string | null;
  email: string | null;
  phone: string | null;
  age: string | null;
  url: string | null;
  password: string | null;
  confirmPassword: string | null;
  terms: boolean;
};
