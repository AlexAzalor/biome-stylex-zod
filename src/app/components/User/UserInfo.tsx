import { memo } from "react";

type Props = {
  name: string;
  email: string;
  age: number;
  url: string;
  phone?: string;
};

export const UserInfo = memo(({ name, email, age, url, phone }: Props) => {
  if (!name || !email || !age || !url) {
    return null;
  }

  return (
    <div>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>Age: {age}</div>
      <div>URL: {url}</div>
      {phone && <div>Phone: {phone}</div>}
    </div>
  );
});

// const styles = ({
//   card: {
//     minHeight: "200px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     alignItems: "flex-start",

//     maxWidth: "max-content",
//     padding: "20px",

//     border: "1px solid rgba(255, 255, 255, .25)",
//     borderRadius: "20px",
//     backgroundColor: "rgba(255, 255, 255, 0.40)",
//     boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.25)",

//     backdropFilter: "blur(12px)",
//   },
//   text: {
//     fontSize: "1.6em",
//     color: "#446",
//     textAlign: "left",
//     wordBreak: "break-all",
//   },
// });
