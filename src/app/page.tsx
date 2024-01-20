"use client";

import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  background: {
    backgroundColor: "blue",
  },
  title: {
    fontSize: 62,
    fontWeight: "bold",
    color: "orange",
  },
});

export default function Home() {
  return (
    <main>
      <h1 {...stylex.props(styles.title)}>Hello world</h1>
    </main>
  );
}
