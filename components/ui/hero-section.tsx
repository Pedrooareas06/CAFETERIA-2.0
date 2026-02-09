"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 600);
  const scale = 1 + scrollY * 0.0003;
  const textY = scrollY * 0.4;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax Zoom */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `scale(${scale})`, willChange: "transform" }}
      >
        <Image
          src="/images/hero-coffee.jpg"
          alt="Café artesanal premium"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-card/40 via-card/20 to-card" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        style={{
          opacity,
          transform: `translateY(${textY}px)`,
          willChange: "transform, opacity",
        }}
      >
        <div
          className={`mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-5 py-2 backdrop-blur-md transition-all duration-1000 ${
            loaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Desde 2014, café artesanal
          </span>
        </div>

        <h1
          className={`font-serif text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem] transition-all duration-1000 delay-200 ${
            loaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <span className="block text-balance">Desperte seus</span>
          <span className="block text-balance text-primary">sentidos.</span>
        </h1>

        <p
          className={`mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg transition-all duration-1000 delay-[400ms] ${
            loaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          Grãos selecionados, torração artesanal e baristas apaixonados.
          Cada xícara conta uma história de sabor, aroma e dedicação.
        </p>

        <div
          className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-1000 delay-[600ms] ${
            loaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="#menu"
            className="group relative overflow-hidden rounded-full bg-primary px-10 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:brightness-110"
          >
            <span className="relative z-10">Ver Cardápio</span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-foreground transition-transform duration-500 group-hover:translate-y-0" />
          </a>
          <a
            href="https://wa.me/5511967125432?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-foreground/15 bg-card/60 px-10 py-4 text-sm font-semibold uppercase tracking-widest text-foreground backdrop-blur-md transition-all duration-300 hover:border-primary hover:text-primary hover:bg-card/80"
          >
            Pedir pelo WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-all duration-1000 delay-[1000ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <a
          href="#marquee"
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors duration-300 hover:text-foreground"
          aria-label="Rolar para baixo"
        >
          <ChevronDown className="h-5 w-5 animate-float" />
        </a>
      </div>
    </section>
  );
}
