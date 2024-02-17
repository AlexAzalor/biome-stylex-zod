import type { FormFieldProps } from "@/app/types/types";

type Props = Pick<FormFieldProps, "register" | "error">;

export const CheckboxField = ({ error, register }: Props) => {
  return (
    <div>
      <label>
        <input type="checkbox" {...register("terms", { required: true })} />I
        agree to the terms and conditions
      </label>

      {error && <div>You must agree to the terms and conditions</div>}
    </div>
  );
};
