"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Image from "next/image";

const menuItems = [
  {
    name: "Espresso",
    description: "Puro, intenso e encorpado. A essencia do café.",
    price: "R$ 8,00",
    image: "/images/espresso.jpg",
  },
  {
    name: "Cappuccino",
    description: "Cremoso com espuma aveludada e latte art.",
    price: "R$ 12,00",
    image: "/images/cappuccino.jpg",
  },
  {
    name: "Cafe Gelado",
    description: "Refrescante e saboroso para dias quentes.",
    price: "R$ 10,00",
    image: "/images/iced-coffee.jpg",
  },
  {
    name: "Latte",
    description: "Café suave com leite vaporizado e arte.",
    price: "R$ 14,00",
    image: "/images/latte.jpg",
  },
  {
    name: "Mocha",
    description: "Café com chocolate belga e chantilly.",
    price: "R$ 15,00",
    image: "/images/mocha.jpg",
  },
  {
    name: "Affogato",
    description: "Espresso sobre sorvete de baunilha.",
    price: "R$ 16,00",
    image: "/images/affogato.jpg",
  },
];

export function MenuSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1);

  return (
    <section id="menu" className="relative py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="mb-16 text-center">
          <p
            className={`mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary transition-all duration-700 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Cardapio Completo
          </p>
          <h2
            className={`font-serif text-4xl font-bold text-foreground md:text-6xl transition-all duration-700 delay-100 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-balance">Escolha seu favorito.</span>
          </h2>
        </div>

        {/* Menu Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <MenuCard key={item.name} item={item} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://wa.me/5511967125432?text=Ol%C3%A1!%20Gostaria%20de%20ver%20o%20card%C3%A1pio%20completo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border-2 border-primary bg-primary/5 px-10 py-4 text-sm font-semibold uppercase tracking-widest text-primary transition-all duration-500 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
          >
            Pedir pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function MenuCard({
  item,
  index,
}: {
  item: (typeof menuItems)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <div
      ref={ref}
      className={`group overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-700 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Price badge */}
        <div className="absolute top-4 right-4 rounded-full bg-card/90 px-4 py-1.5 backdrop-blur-md shadow-md transition-transform duration-500 group-hover:scale-110">
          <span className="font-serif text-lg font-bold text-primary">
            {item.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-xl font-bold text-foreground">
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <a
          href={`https://wa.me/5511967125432?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20${encodeURIComponent(item.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3"
        >
          Pedir agora
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {"->"}
          </span>
        </a>
      </div>
    </div>
  );
}
