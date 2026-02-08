"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Image from "next/image";
import { Gift, ArrowRight } from "lucide-react";

export function PromoSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-3xl bg-primary transition-all duration-[1.2s] ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-97"
          }`}
        >
          <div className="grid items-center lg:grid-cols-2">
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <div
                className={`inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 backdrop-blur-sm transition-all duration-700 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <Gift className="h-3.5 w-3.5 text-primary-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                  Promocao Especial
                </span>
              </div>

              <h2
                className={`mt-6 font-serif text-3xl font-bold leading-tight text-primary-foreground md:text-5xl transition-all duration-700 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <span className="text-balance">
                  Compre 2, leve 3.
                </span>
              </h2>
              <p
                className={`mt-4 max-w-md text-base leading-relaxed text-primary-foreground/80 transition-all duration-700 delay-[400ms] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Na compra de dois cafés especiais, o terceiro e por nossa conta.
                Valido de segunda a sexta, das 14h as 17h. Traga um amigo e
                aproveite!
              </p>
              <a
                href="https://wa.me/5511967125432?text=Ol%C3%A1!%20Vi%20a%20promo%C3%A7%C3%A3o%20Compre%202%20Leve%203%20no%20site!"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex items-center gap-3 rounded-full bg-primary-foreground px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-primary transition-all duration-700 delay-500 hover:shadow-lg hover:brightness-95 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Aproveitar agora
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Image */}
            <div className="relative hidden aspect-square lg:block">
              <Image
                src="/images/latte.jpg"
                alt="Promocao cafe especial"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
