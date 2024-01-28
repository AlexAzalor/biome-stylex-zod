"use client";

import stylex from "@stylexjs/stylex";
import { ModernForm } from "./ModernForm/ModernForm";
import { PrimitiveForm } from "./PrimitiveForm/PrimitiveForm";

export default function Home() {
  return (
    <main>
      <h1 {...stylex.props(styles.title)}>Hello Simple2B</h1>
      <div {...stylex.props(styles.main)}>
        <PrimitiveForm />
        <ModernForm />
      </div>
    </main>
  );
}

const styles = stylex.create({
  main: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(650px, 100%), 1fr))",
    gridAutoRows: "minmax(auto, auto)",
    // gridTemplateColumns: "1fr 1fr",
    alignItems: "baseline",
    placeItems: "center",
    gap: "20px",
  },
  background: {
    backgroundColor: "blue",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#2D64AC",
    margin: 0,
  },
});
