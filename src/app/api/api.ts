import type { ApiResponse, TypeUserSchema } from "../types/types";

export const simulateApiRequest = (data: TypeUserSchema, delay = 2000) => {
  return new Promise<ApiResponse<TypeUserSchema>>((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, delay);
  });
};

export const checkEmail = (email: string) => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(email === "exists@email.com");
    }, 1000);
  });
};
