import { ZodType, z } from "zod";
import { checkEmail } from "../api/api";
import type { TypeUserSchema } from "./types";

export const UserSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .trim()
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().min(1, { message: "Email is required" }).email().trim(),
    phone: z
      .union([
        z
          .string()
          .min(10, { message: "Phone numbers are a minimum of 10 digits" })
          .max(14, { message: "Phone numbers are a maximum of 14 digits" })
          // .length(10, { message: "Ten numbers are required" })
          .regex(/^[+0-9]+$/, { message: "Only numbers are allowed" })
          .transform((val) => `+${val}`),
        z.literal(""),
      ])
      .optional(),
    age: z.coerce
      .number({
        invalid_type_error: "Age must be a number",
      })
      .min(1, { message: "Age is required" })
      .gte(18, { message: "Age must be between 18 and 100" })
      .lte(100, { message: "Age must be between 18 and 100" }),
    url: z
      .string()
      .min(1, { message: "URL is required" })
      .url()
      .trim()
      .toLowerCase()
      .includes("google.com", { message: "Invalid Google URL" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "The password must be a maximum of 20 characters" })
      .superRefine((data, ctx) => {
        validatePassword(data, ctx);
      }),
    confirmPassword: z.string().optional(),
    terms: z.boolean().refine((data) => data === true, {
      message: "You must agree to the terms",
      path: ["terms"],
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const EmailDBValidation = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .refine(async (value) => {
      // Perform async validation logic (e.g., check if email exists in the database)
      const isEmailExists = await checkEmail(value);
      return !isEmailExists;
    }, "Email already exists"),
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

  const isUppercase = !/[A-Z]/.test(data);
  const isLowercase = !/[a-z]/.test(data);
  const isNumber = !/\d/.test(data);
  const isSpecialCharacter = !/[!@#$%^&*(),.?":{}|<>]/.test(data);

  if (isUppercase) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must contain at least one uppercase letter",
    });
  }

  if (isLowercase) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must contain at least one lowercase letter",
    });
  }

  if (isNumber) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must contain at least one number",
    });
  }

  if (isSpecialCharacter) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password must contain at least one special character",
    });
  }
}

// Inheritance
const NameAndEmail = z.object({
  name: z.string(),
  email: z.string().email(),
});

const WithPhone = NameAndEmail.extend({
  phone: z.string().optional(),
});

const WithAgeAndUrl = WithPhone.extend({
  age: z.number(),
  url: z.string().url(),
});

export const WithPasswordAndTerms: ZodType<TypeUserSchema> =
  WithAgeAndUrl.extend({
    password: z.string(),
    confirmPassword: z.string(),
    terms: z.boolean(),
  });

export const OnlyEmail = NameAndEmail.pick({ email: true });
export const OnlyName = NameAndEmail.omit({ email: true });
export const AllOptional = NameAndEmail.partial();
