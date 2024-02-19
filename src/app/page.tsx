"use client";

import { ModernForm } from "./components/ModernForm/ModernForm";
import { PrimitiveForm } from "./components/PrimitiveForm/PrimitiveForm";

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(650px,100%),1fr))] grid-rows-[minmax(auto,auto)] place-items-center gap-5">
        <PrimitiveForm />
        <ModernForm />
      </div>
    </main>
  );
}
