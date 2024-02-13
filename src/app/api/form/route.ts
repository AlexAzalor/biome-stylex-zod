import type { TypeUserSchema } from "@/app/types/types";
import { UserSchema } from "@/app/types/zod-scheme";
import { NextResponse } from "next/server";
import { simulateApiRequest } from "../api";

export async function POST(request: Request) {
  const body: TypeUserSchema = await request.json();
  // const badData = {
  //   name: 1234,
  //   email: "Not an email",
  //   age: "Hello",
  //   url: "Not a URL",
  //   password: 1234,
  //   confirmPassword: 12345,
  //   terms: false,
  // };

  const result = UserSchema.safeParse(body);

  if (result.success) {
    // delete body.confirmPassword;
    const { confirmPassword, ...formDataWithoutConfirmPassword } = body;

    await simulateApiRequest(formDataWithoutConfirmPassword);

    return NextResponse.json({ status: 200 });
  }

  const serverErrors = Object.fromEntries(
    result.error.issues.map((issue) => [issue.path[0], issue.message]) || [],
  );

  return NextResponse.json({ errors: serverErrors });
}
