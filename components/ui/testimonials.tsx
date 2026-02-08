"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Carolina",
    role: "Cliente desde 2018",
    text: "O melhor cappuccino que ja provei em Sao Paulo. O ambiente e acolhedor e os baristas sao incriveis. Meu cantinho favorito!",
    stars: 5,
  },
  {
    name: "Rafael Santos",
    role: "Amante de cafe",
    text: "O cold brew de 12 horas mudou minha vida. Suave, sem amargor e naturalmente doce. Venho todos os dias antes do trabalho.",
    stars: 5,
  },
  {
    name: "Juliana Oliveira",
    role: "Food Blogger",
    text: "O Cafe Aroma e uma experiencia sensorial completa. O affogato e divino e o atendimento pelo WhatsApp e super rapido!",
    stars: 5,
  },
];

export function TestimonialsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1);

  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="mb-16 text-center">
          <p
            className={`mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary transition-all duration-700 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            O que dizem sobre nos
          </p>
          <h2
            className={`font-serif text-4xl font-bold text-foreground md:text-6xl transition-all duration-700 delay-100 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-balance">Clientes apaixonados.</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`flex flex-col rounded-2xl border border-border/60 bg-card p-7 transition-all duration-700 hover:shadow-lg hover:border-primary/20 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-primary text-primary"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {`"${testimonial.text}"`}
      </p>

      {/* Author */}
      <div className="mt-6 border-t border-border/60 pt-5">
        <p className="text-sm font-semibold text-foreground">
          {testimonial.name}
        </p>
        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
      </div>
    </div>
  );
}
