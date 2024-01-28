import { ZodType, z } from "zod";
import { FormData } from "../types";

export const UserSchema: ZodType<FormData> = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().min(1, { message: "Email is required" }).email().trim(),
    phone: z
      .string()
      // .min(10, { message: "Phone numbers are a minimum of 10 digits" })
      // .max(14, { message: "Phone numbers are a maximum of 14 digits" })
      .regex(/^[0-9]+$/, { message: "Only numbers are allowed" })
      .length(10, { message: "Ten numbers are required" }),
    // .transform(
    //   (val) => `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6)}`,
    // ),
    age: z
      .number({
        required_error: "required field",
        invalid_type_error: "Age must be a number",
      })
      .min(18, { message: "Age must be between 18 and 100" })
      .max(100, { message: "Age must be between 18 and 100" }),
    url: z
      .string()
      .min(1, { message: "URL is required" })
      .url()
      .trim()
      .includes("google.com", { message: "Invalid Google URL" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" })
      .superRefine((data, ctx) => {
        validatePassword(data, ctx);
      }),
    // .regex(passwordValidation, {
    //   message: "Your password is not valid",
    // })
    confirmPassword: z.string(),
    terms: z
      .boolean({
        required_error: "required field",
        invalid_type_error: "You must agree to the terms",
      })
      .refine((data) => data === true, {
        message: "You must agree to the terms",
        path: ["terms"],
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function validatePassword(data: string, ctx: z.RefinementCtx) {
  // if (data.length < 8) {
  //   ctx.addIssue({
  //     code: z.ZodIssueCode.too_small,
  //     minimum: 8,
  //     type: "string",
  //     inclusive: true,
  //     message: "Password is too short",
  //   });
  // }
  // if (data.length > 20) {
  //   ctx.addIssue({
  //     code: z.ZodIssueCode.too_big,
  //     maximum: 20,
  //     type: "string",
  //     inclusive: true,
  //     message: "Password is too long",
  //   });
  // }
  if (!/[A-Z]/.test(data)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must contain at least one uppercase letter",
    });
  }
  if (!/[a-z]/.test(data)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must contain at least one lowercase letter",
    });
  }
  if (!/\d/.test(data)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must contain at least one number",
    });
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(data)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must contain at least one special character",
    });
  }
}

// Inheritance
const NameAndEmail = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().min(1, { message: "Email is required" }).email().trim(),
});

const WithPhone = NameAndEmail.extend({
  phone: z
    .string()
    .min(10, { message: "Phone numbers are a minimum of 10 digits" }),
  // .regex(/^[0-9]+$/, { message: "Only numbers are allowed" })
  // .length(10, { message: "Ten numbers are required" })
  // .transform(val => `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6)}`),
});

const WithAgeAndUrl = WithPhone.extend({
  age: z
    .number({
      required_error: "required field",
      invalid_type_error: "Age must be a number",
    })
    .min(18, { message: "Age must be between 18 and 100" })
    .max(100, { message: "Age must be between 18 and 100" }),
  url: z
    .string()
    .min(1, { message: "URL is required" })
    .url()
    .trim()
    .includes("google.com", { message: "Invalid Google URL" }),
});

export const WithPassword: ZodType<FormData> = WithAgeAndUrl.extend({
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" })
    .superRefine((data, ctx) => {
      validatePassword(data, ctx);
    }),

  confirmPassword: z.string(),
  terms: z
    .boolean({
      required_error: "required field",
      invalid_type_error: "You must agree to the terms",
    })
    .refine((data) => data === true, {
      message: "You must agree to the terms",
      path: ["terms"],
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
