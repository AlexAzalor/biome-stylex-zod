import type { ApiResponse, TypeUserSchema } from "../types/types";

type UserData = Omit<TypeUserSchema, "confirmPassword">;

export const simulateApiRequest = (data: UserData, delay = 2000) => {
  return new Promise<ApiResponse<UserData>>((resolve) => {
    setTimeout(() => {
      // biome-ignore lint/performance/noDelete: <explanation>
      delete (data as Partial<UserData>).password;
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
