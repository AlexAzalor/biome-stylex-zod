import type { FormFieldProps } from "@/app/types/types";

type Props = Pick<FormFieldProps, "register" | "error">;

export const CheckboxField = ({ error, register }: Props) => {
  return (
    <div className="text-left mt-5">
      <label className="flex gap-2 text-sm items-center p-1">
        <input type="checkbox" {...register("terms", { required: true })} />I
        agree to the terms and conditions
      </label>

      {error && (
        <div className="text-[tomato] text-sm">
          You must agree to the terms and conditions
        </div>
      )}
    </div>
  );
};
