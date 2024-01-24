"use client";

import stylex from "@stylexjs/stylex";
import { PrimitiveForm } from "./PrimitiveForm/PrimitiveForm";

export default function Home() {
  return (
    <main>
      <h1 {...stylex.props(styles.title)}>Hello world</h1>
      <PrimitiveForm />
    </main>
  );
}

const styles = stylex.create({
  background: {
    backgroundColor: "blue",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "orange",
  },
});
