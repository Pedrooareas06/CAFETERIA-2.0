"use client";

import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        // Esconder quando o footer ficar visível
        setIsVisible(footerRect.top > window.innerHeight + 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    isVisible && (
      <a
        href="https://wa.me/5511967125432?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Caf%C3%A9%20Aroma"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/30 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 group"
        aria-label="Fale pelo WhatsApp com nossos atendentes"
      >
        <MessageCircle className="h-4 w-4 text-[#fff] group-focus:scale-110 transition-transform" />
      </a>
    )
  );
}
