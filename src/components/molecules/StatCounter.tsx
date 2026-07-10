"use client";

import { useEffect, useRef, useState } from "react";

export function StatCounter({
  label,
  value,
  suffix = "",
  display,
}: {
  label: string;
  value: number;
  suffix?: string;
  display?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const duration = 1500;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  const shown =
    display && count >= value
      ? display
      : `${count.toLocaleString()}${suffix}`;

  return (
    <div ref={ref} className="py-2 text-center">
      <h3 className="mb-2 text-sm font-semibold tracking-wide text-ink uppercase">
        {label}
      </h3>
      <h4 className="text-3xl font-bold text-brand md:text-4xl">{shown}</h4>
    </div>
  );
}
