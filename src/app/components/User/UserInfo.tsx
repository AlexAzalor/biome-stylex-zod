import { memo } from "react";

type Props = {
  name: string;
  email: string;
  age: number;
  url: string;
  phone?: string;
};

const textStyle = "text-2xl text-[#6e58a5] text-left break-all";

export const UserInfo = memo(({ name, email, age, url, phone }: Props) => {
  if (!name || !email || !age || !url) {
    return null;
  }

  return (
    <div
      className="min-h-[200px] flex flex-col justify-between items-start max-w-max p-5
    border-[1px] border-[rgba(255,255,255,.25)] border-solid rounded-[20px] bg-[rgba(255, 255, 255, 0.40)]
    backdrop-blur-[12px] shadow-cardShadow"
    >
      <div className={textStyle}>Name: {name}</div>
      <div className={textStyle}>Email: {email}</div>
      <div className={textStyle}>Age: {age}</div>
      <div className={textStyle}>URL: {url}</div>
      {phone && <div className={textStyle}>Phone: {phone}</div>}
    </div>
  );
});
