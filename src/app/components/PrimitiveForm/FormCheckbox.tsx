import { formStyles } from "@/app/styles/form-styles";
import stylex from "@stylexjs/stylex";

type Props = {
  error: string | null;
};

export const FormCheckbox = ({ error }: Props) => {
  return (
    <div {...stylex.props(formStyles.terms)}>
      <label {...stylex.props(formStyles.termsLabel)} htmlFor="terms">
        <input id="terms" type="checkbox" name="terms" />
        <span>I agree to the terms and conditions</span>
      </label>
      {error && <div {...stylex.props(formStyles.error)}>{error}</div>}
    </div>
  );
};
