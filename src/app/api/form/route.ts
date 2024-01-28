import { FormData } from "@/app/types/types";
import { UserSchema } from "@/app/types/zod-scheme";
import { NextResponse } from "next/server";
import { simulateApiRequest } from "../api";

export async function POST(request: Request) {
  const body: FormData = await request.json();

  // Use Zod to validate the received data against the UserSchema
  const result = UserSchema.safeParse(body);

  // Check if the validation is successful
  if (result.success) {
    // await AccountService.signUp(body);
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    await simulateApiRequest(body);
    return NextResponse.json({ status: 200 });
  }

  // If validation errors, map them into an object
  const serverErrors = Object.fromEntries(
    result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || [],
  );

  // Respond with a JSON object containing the validation errors
  return NextResponse.json({ errors: serverErrors }, { status: 422 });
}
