"use client";

import { clients } from "@/content/site";

export function ClientMarquee() {
  const logos = [...clients, ...clients];

  return (
    <div className="client-carousel overflow-hidden py-4">
      <div className="carousel-track flex w-max animate-slide-rtl items-center gap-12 hover:[animation-play-state:paused]">
        {logos.map((client, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${client.name}-${i}`}
            src={client.logo}
            alt={client.name}
            className="h-12 w-auto object-contain opacity-80"
          />
        ))}
      </div>
    </div>
  );
}
