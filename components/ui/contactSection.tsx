"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Endereço",
    value: "Rua do Café Gostoso, 123 - Centro, São Paulo - SP",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "(11) 96712-5432",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@cafearoma.com.br",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Seg-Sex: 7h-20h | Sab-Dom: 8h-18h",
  },
];

export function ContactSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.1);
  const { ref: contentRef, isVisible: contentVisible } =
    useScrollAnimation(0.1);
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation(0.05);

  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
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
            Venha nos visitar
          </p>
          <h2
            className={`font-serif text-4xl font-bold text-foreground md:text-6xl transition-all duration-700 delay-100 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-balance">Onde nos encontrar</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div ref={contentRef} className="grid gap-8 lg:grid-cols-2">
          {/* Left - Info + WhatsApp */}
          <div className="flex flex-col gap-5">
            {contactInfo.map((info, i) => (
              <div
                key={info.label}
                className={`flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all duration-700 hover:shadow-md hover:border-primary/20 ${
                  contentVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <info.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {info.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <div
              className={`mt-2 flex flex-col items-center rounded-2xl border-2 border-[#25D366]/20 bg-[#25D366]/5 p-8 text-center transition-all duration-700 ${
                contentVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10">
                <MessageCircle className="h-8 w-8 text-[#25D366]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">
                Fale pelo WhatsApp
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Pedidos, reservas e dúvidas. Resposta rápida!
              </p>
              <a
                href="https://wa.me/5511967125432?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Caf%C3%A9%20Aroma"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-[#fff] transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/25 hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4" />
                Iniciar Conversa
              </a>
            </div>
          </div>

          {/* Right - Google Maps */}
          <div
            ref={mapRef}
            className={`overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-[1s] ${
              mapVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-98"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976!2d-46.6388!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sSe%2C%20Sao%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "500px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Café Raízes - Centro de São Paulo"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
