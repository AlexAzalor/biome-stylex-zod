import { AxiosResponse } from "axios";
import type { UserFormResponse, ValidFieldNames } from "./types/types";

export const validateName = (name: string) => {
  if (!name) {
    return "Name is required";
  }

  const minLength = 3;
  const maxLength = 50;

  if (name.length < minLength) {
    return `Name must be at least ${minLength} characters long`;
  }

  if (name.length > maxLength) {
    return `Name must be no more than ${maxLength} characters long`;
  }

  return "Name is valid";
};

export const validateEmail = (email: string) => {
  if (!email) {
    return "Email is required";
  }

  const regexEmal = "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$";
  const validEmail = !!email.toString().match(regexEmal);

  if (!validEmail) {
    return "Invalid email";
  }

  return "Email is valid";
};

export const validatePhone = (phone: string) => {
  if (!phone) {
    return "";
  }

  const minLength = 10;
  const maxLength = 14;

  if (phone.length < minLength) {
    return `Phone numbers are a minimum of ${minLength} digits`;
  }

  if (!/^\d+$/.test(phone)) {
    return "Only numbers are allowed";
  }

  if (phone.length > maxLength) {
    return `Phone numbers are a maximum of ${maxLength} digits`;
  }

  return "Phone is valid";
};

export const validateAge = (age: number) => {
  const minAge = 18;
  const maxAge = 100;

  if (!age && age === 0) {
    return "Age is required";
  }

  if (!Number.isInteger(age) || age < 0) {
    return "Age must be a number";
  }

  if (age < minAge || age > maxAge) {
    return `Age must be between ${minAge} and ${maxAge}`;
  }

  return "Age is valid";
};

export const validateURL = (url: string) => {
  if (!url) {
    return "URL is required";
  }

  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  if (!urlPattern.test(url)) {
    return "Invalid url";
  }

  if (!url.includes("google.com")) {
    return "Invalid Google URL";
  }

  return "URL is valid";
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "Password is required";
  }

  const minLength = 8;
  const maxLength = 20;
  const isUppercase = /[A-Z]/.test(password);
  const isLowercase = /[a-z]/.test(password);
  const isNumber = /\d/.test(password);
  const isSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  }

  if (!isUppercase) {
    return "Password must contain at least one uppercase letter";
  }

  if (!isLowercase) {
    return "Password must contain at least one lowercase letter";
  }

  if (!isNumber) {
    return "Password must contain at least one number";
  }

  if (!isSpecialCharacter) {
    return "Password must contain at least one special character";
  }

  if (password.length > maxLength) {
    return `The password must be a maximum of ${maxLength} characters`;
  }

  return "Password is valid";
};

export const handleResponseError = (
  response: AxiosResponse<UserFormResponse>,
) => {
  if (response.data.status === 200) {
    return {};
  }

  const { errors = {} } = response.data;

  const fieldErrorMapping: Record<string, ValidFieldNames> = {
    name: "name",
    email: "email",
    age: "age",
    url: "url",
    password: "password",
    confirmPassword: "confirmPassword",
    terms: "terms",
  };

  const fieldWithError = Object.keys(fieldErrorMapping).find(
    (field) => errors[field],
  );

  return { errors, fieldErrorMapping, fieldWithError };
};
