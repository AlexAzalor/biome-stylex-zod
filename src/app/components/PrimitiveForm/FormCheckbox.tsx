type Props = {
  error: string | null;
};

export const FormCheckbox = ({ error }: Props) => {
  return (
    <div>
      <label htmlFor="terms">
        <input id="terms" type="checkbox" name="terms" />
        <span>I agree to the terms and conditions</span>
      </label>
      {error && <div>{error}</div>}
    </div>
  );
};
