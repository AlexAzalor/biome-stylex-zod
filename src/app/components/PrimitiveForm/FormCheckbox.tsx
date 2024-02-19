type Props = {
  error: string | null;
};

export const FormCheckbox = ({ error }: Props) => {
  return (
    <div className="text-left mt-5">
      <label htmlFor="terms" className="flex gap-2 text-sm items-center p-1">
        <input id="terms" type="checkbox" name="terms" />
        <span>I agree to the terms and conditions</span>
      </label>

      {error && <div className="text-[tomato] text-sm">{error}</div>}
    </div>
  );
};
