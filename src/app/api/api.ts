import type { ApiResponse, User } from "../types";

export const simulateApiRequest = (data: User, delay = 2000) => {
  return new Promise<ApiResponse<User>>((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, delay);
  });
};
