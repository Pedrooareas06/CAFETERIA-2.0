"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Image from "next/image";

const stats = [
  { value: "10+", label: "Anos de experiencia" },
  { value: "50k+", label: "Xicaras servidas" },
  { value: "100%", label: "Graos selecionados" },
  { value: "4.9", label: "Avaliacao Google" },
];

export function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.15);
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation(0.1);

  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div
            ref={imageRef}
            className={`relative overflow-hidden rounded-3xl transition-all duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1) ${
              imageVisible
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 -translate-x-16 scale-95"
            }`}
          >
            <div className="aspect-[4/5] relative">
              <Image
                src="/images/about-cafe.jpg"
                alt="Interior do Cafe Aroma"
                fill
                className="object-cover transition-transform duration-[1.5s] hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 rounded-2xl bg-card/90 px-6 py-4 backdrop-blur-lg shadow-lg">
              <p className="font-serif text-3xl font-bold text-primary">
                2014
              </p>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Fundado com paixao
              </p>
            </div>
          </div>

          {/* Content */}
          <div ref={sectionRef}>
            <p
              className={`mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Nossa Historia
            </p>
            <h2
              className={`font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="text-balance">
                Paixao pelo cafe, do grao a xicara.
              </span>
            </h2>
            <p
              className={`mt-6 text-base leading-relaxed text-muted-foreground md:text-lg transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Ha mais de 10 anos, o Cafe Aroma traz a melhor experiencia em cafe
              artesanal. Selecionamos graos especiais de produtores locais e
              preparamos cada xicara com dedicacao. Nosso compromisso e com a
              qualidade, sustentabilidade e a arte de fazer cafe.
            </p>

            {/* Stats */}
            <div
              className={`mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/60 bg-card/50 p-4 text-center transition-all duration-500 hover:shadow-md hover:border-primary/20"
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <p className="font-serif text-2xl font-bold text-primary md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
