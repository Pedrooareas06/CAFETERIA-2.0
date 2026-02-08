"use client";

import { Coffee } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/30 py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Coffee className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-bold text-foreground">
              Cafe Aroma
            </span>
          </div>

          <div className="flex items-center gap-6">
            {["Inicio", "Sobre", "Cardapio", "Contato"].map((label) => (
              <a
                key={label}
                href={`#${label === "Inicio" ? "hero" : label === "Cardapio" ? "menu" : label.toLowerCase()}`}
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            {"2024 Cafe Aroma. Todos os direitos reservados."}
          </p>
        </div>
      </div>
    </footer>
  );
}
