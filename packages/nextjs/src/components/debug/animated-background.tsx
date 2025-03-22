"use client";

import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [bubbles, setBubbles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-indigo-500/20 dark:bg-indigo-400/20"
        style={{
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 10 + 10}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ));

    setBubbles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles}
    </div>
  );
}
