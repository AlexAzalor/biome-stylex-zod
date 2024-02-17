"use client";

import { ModernForm } from "./components/ModernForm/ModernForm";
import { PrimitiveForm } from "./components/PrimitiveForm/PrimitiveForm";

export default function Home() {
  return (
    <main>
      <div>
        <PrimitiveForm />
        <ModernForm />
      </div>
    </main>
  );
}

// const styles = ({
//   main: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(min(650px, 100%), 1fr))",
//     gridAutoRows: "minmax(auto, auto)",
//     alignItems: "baseline",
//     placeItems: "center",
//     gap: "20px",
//   },
//   background: {
//     backgroundColor: "blue",
//   },
//   title: {
//     fontSize: 42,
//     fontWeight: "bold",
//     color: "#2D64AC",
//     margin: 0,
//   },
// });
