"use client";

import stylex from "@stylexjs/stylex";

type Props = {
  name: string;
  email: string;
  age: string;
  url: string;
};

export const UserInfo = ({ name, email, age, url }: Props) => {
  if (!name || !email || !age || !url) {
    return null;
  }

  return (
    <div {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.text)}>Name: {name}</div>
      <div {...stylex.props(styles.text)}>Email: {email}</div>
      <div {...stylex.props(styles.text)}>Age: {age}</div>
      <div {...stylex.props(styles.text)}>URL: {url}</div>
    </div>
  );
};

const styles = stylex.create({
  card: {
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",

    maxWidth: "max-content",
    padding: "20px",

    border: "1px solid rgba(255, 255, 255, .25)",
    borderRadius: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.40)",
    boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.25)",

    backdropFilter: "blur(12px)",
  },
  text: {
    fontSize: "1.6em",
    color: "#446",
  },
});
