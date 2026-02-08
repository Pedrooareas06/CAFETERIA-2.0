"use client";

import { Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/30 py-10" id="footer">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="font-serif text-base font-bold text-foreground">
              Desenvolvido por Pedro Areas
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/pedrohenriquefrontend/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition-transform duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/Pedrooareas06?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white transition-transform duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            </div>
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
            {"© 2024 Desenvolvido por Pedro Areas. Todos os direitos reservados."}
          </p>
        </div>
      </div>
    </footer>
  );
}
