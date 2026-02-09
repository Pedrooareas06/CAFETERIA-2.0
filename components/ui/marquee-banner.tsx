"use client";

import { Coffee } from "lucide-react";

const items = [
  "Espresso",
  "Cappuccino",
  "Latte Art",
  "Cold Brew",
  "Mocha",
  "Affogato",
  "Macchiato",
  "Café Gelado",
  "Grãos Especiais",
];

export function MarqueeBanner() {
  return (
    <section
      id="marquee"
      className="overflow-hidden border-y border-border/60 bg-secondary/50 py-4"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 flex items-center gap-3 text-sm font-medium tracking-wider text-muted-foreground uppercase"
          >
            <Coffee className="h-3.5 w-3.5 text-primary/60" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
