"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  "/images/banner-pd-1366by768-final.png",
  "/images/Banner-about3.jpg",
  "/images/AI-ML.png",
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative aspect-[16/7] overflow-hidden bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.img
              key={slides[index]}
              src={slides[index]}
              alt="Tuppl banner"
              initial={{ opacity: 0.2, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-brand" : "bg-white/80"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
