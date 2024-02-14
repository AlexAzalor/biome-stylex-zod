import { formStyles } from "@/app/styles/form-styles";
import type { FormFieldProps } from "@/app/types/types";
import stylex from "@stylexjs/stylex";

type Props = Pick<FormFieldProps, "register" | "error">;

export const CheckboxField = ({ error, register }: Props) => {
  return (
    <div {...stylex.props(formStyles.terms)}>
      <label {...stylex.props(formStyles.termsLabel)}>
        <input type="checkbox" {...register("terms", { required: true })} />I
        agree to the terms and conditions
      </label>

      {error && (
        <div {...stylex.props(formStyles.error)}>
          You must agree to the terms and conditions
        </div>
      )}
    </div>
  );
};
