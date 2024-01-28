import type { ApiResponse, FormData } from "../types/types";

export const simulateApiRequest = (data: FormData, delay = 2000) => {
  return new Promise<ApiResponse<FormData>>((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, delay);
  });
};
