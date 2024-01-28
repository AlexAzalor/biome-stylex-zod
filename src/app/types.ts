import { FieldError, UseFormRegister } from "react-hook-form";

export type User = {
  name: string;
  email: string;
  age: number;
  url: string;
};

export type ApiResponse<T> = {
  data: T;
};

export type FormData = {
  name: string;
  email: string;
  phone: string;
  age: number;
  url: string;
  password: string;
  confirmPassword?: string;
  terms: boolean;
};

export type FormFieldProps = {
  type: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
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
