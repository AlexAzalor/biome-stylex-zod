import type { ApiResponse, FormData } from "../types/types";

export const simulateApiRequest = (data: FormData, delay = 2000) => {
  return new Promise<ApiResponse<FormData>>((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, delay);
  });
};

export const checkEmail = (email: string) => {
  console.log("checkEmail", email);

  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(email === "xy55xy.azalor@gmail.com");
    }, 1000);
  });
};
