"use client";

import { useState, useEffect } from "react";
import { Menu, X, Coffee } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Destaques", href: "#highlights" },
  { label: "Cardapio", href: "#menu" },
  { label: "Contato", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-card/90 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a
          href="#hero"
          className="flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-70"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Coffee className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-bold tracking-wide text-foreground">
            Cafe Aroma
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5511967125432?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Caf%C3%A9%20Aroma"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:brightness-110"
          >
            Pedir Agora
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-foreground md:hidden"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      <div
        className={`fixed inset-0 top-0 z-40 bg-card/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-3xl font-bold text-foreground transition-all duration-500 hover:text-primary"
              style={{
                transitionDelay: isMobileMenuOpen ? `${i * 80}ms` : "0ms",
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen
                  ? "translateY(0)"
                  : "translateY(20px)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5511967125432?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Caf%C3%A9%20Aroma"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground"
            style={{
              transitionDelay: isMobileMenuOpen ? "400ms" : "0ms",
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
