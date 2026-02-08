"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Image from "next/image";
import { Star, Flame, Snowflake } from "lucide-react";

const highlights = [
  {
    tag: "Mais Vendido",
    icon: Star,
    name: "Cappuccino Classico",
    description:
      "Espuma cremosa e aveludada sobre um espresso encorpado. A combinacao perfeita que conquistou o coracao dos nossos clientes. Feito com leite fresco e graos 100% arabica.",
    price: "R$ 12,00",
    image: "/images/cappuccino.jpg",
    cta: "Eu quero!",
  },
  {
    tag: "Novidade",
    icon: Flame,
    name: "Mocha Premium",
    description:
      "Chocolate belga artesanal encontra nosso espresso especial. Coberto com chantilly fresco e raspas de chocolate. Uma sobremesa em forma de cafe.",
    price: "R$ 15,00",
    image: "/images/mocha.jpg",
    cta: "Experimentar",
  },
  {
    tag: "Refrescante",
    icon: Snowflake,
    name: "Cold Brew 12h",
    description:
      "Extraido a frio por 12 horas para um sabor suave e naturalmente doce. Sem amargor, sem acidez. O cafe perfeito para os dias quentes de Sao Paulo.",
    price: "R$ 13,00",
    image: "/images/cold-brew.jpg",
    cta: "Quero provar",
  },
];

export function FeaturesSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1);

  return (
    <section id="highlights" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title */}
        <div ref={titleRef} className="mb-16 text-center lg:mb-20">
          <p
            className={`mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary transition-all duration-700 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Destaques da casa
          </p>
          <h2
            className={`font-serif text-4xl font-bold text-foreground md:text-6xl transition-all duration-700 delay-100 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-balance">Feitos para apaixonar.</span>
          </h2>
          <p
            className={`mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground transition-all duration-700 delay-200 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Nossos baristas preparam cada bebida como se fosse a primeira vez.
            Prove e sinta a diferenca.
          </p>
        </div>

        {/* Highlights */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {highlights.map((item, index) => (
            <HighlightItem key={item.name} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightItem({
  item,
  index,
}: {
  item: (typeof highlights)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        isEven ? "" : "lg:[direction:rtl]"
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden rounded-3xl transition-all duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1) lg:[direction:ltr] ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-12 scale-95"
        }`}
      >
        <div className="aspect-[4/3] relative group">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Price overlay */}
          <div className="absolute top-5 right-5 rounded-full bg-card/90 px-5 py-2.5 backdrop-blur-md shadow-lg">
            <span className="font-serif text-xl font-bold text-primary">
              {item.price}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="lg:[direction:ltr]">
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <item.icon className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {item.tag}
          </span>
        </div>

        <h3
          className={`mt-5 font-serif text-3xl font-bold text-foreground md:text-5xl transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {item.name}
        </h3>

        <p
          className={`mt-5 text-base leading-relaxed text-muted-foreground md:text-lg transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {item.description}
        </p>

        <a
          href={`https://wa.me/5511967125432?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20${encodeURIComponent(item.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-700 hover:shadow-xl hover:shadow-primary/25 hover:brightness-110 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {item.cta}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {"->"}
          </span>
        </a>
      </div>
    </div>
  );
}
