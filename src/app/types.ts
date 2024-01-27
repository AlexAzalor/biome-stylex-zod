export type User = {
  name: string;
  email: string;
  age: string;
  url: string;
};

export type ApiResponse<T> = {
  data: T;
};
