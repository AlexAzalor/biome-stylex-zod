import type { ApiResponse, FormData, User } from "../types";

export const simulateApiRequest = (data: FormData, delay = 2000) => {
  return new Promise<ApiResponse<FormData>>((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, delay);
  });
};
