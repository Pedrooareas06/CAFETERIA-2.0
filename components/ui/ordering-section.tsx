"use client";

import { useState } from "react";
import { OrderForm } from "@/components/ui/order-form";
import { ReservationForm } from "@/components/ui/reservation-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { ShoppingBag, Calendar } from "lucide-react";

export function OrderingSection() {
  const [activeTab, setActiveTab] = useState("order");

  return (
    <section id="ordering" className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-b from-background to-card/20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Peça Seu Café
          </p>
          <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl mb-4">
            <span className="text-balance">
              Café Raízes Entregue em Casa
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Peça online, reserve sua mesa ou aproveite nossa entrega. Qualidade garantida do grão à sua xícara.
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="order" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Fazer Pedido</span>
              <span className="sm:hidden">Pedido</span>
            </TabsTrigger>
            <TabsTrigger value="reservation" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Reservar Mesa</span>
              <span className="sm:hidden">Reserva</span>
            </TabsTrigger>
          </TabsList>

          {/* Pedidos Tab */}
          <TabsContent value="order" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold">Como Funciona</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">1</span>
                    <span>Escolha seus cafés e itens especiais no menu</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">2</span>
                    <span>Adicione ao carrinho e preencha seus dados</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">3</span>
                    <span>Receberemos via WhatsApp e confirmaremos</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">4</span>
                    <span>Entregamos em sua casa com cuidado</span>
                  </li>
                </ul>

                <div className="rounded-lg border border-border bg-card/50 p-4 mt-6">
                  <p className="text-sm font-medium mb-2">🚚 Entrega</p>
                  <p className="text-xs text-muted-foreground">
                    Atendemos em São Paulo. Taxa de entrega: R$ 8,00
                  </p>
                </div>
              </div>

              <OrderForm />
            </div>
          </TabsContent>

          {/* Reservas Tab */}
          <TabsContent value="reservation" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold">Reserve Sua Mesa</h3>
                <p className="text-muted-foreground">
                  Aproveite nosso ambiente aconchegante com convites especiais com histórias de café.
                </p>

                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">✓</span>
                    <span>Ambientes privados para grupos</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">✓</span>
                    <span>Atendimento de baristas especializados</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">✓</span>
                    <span>Café com origem rastreada</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">✓</span>
                    <span>Perfeito para eventos e reuniões</span>
                  </li>
                </ul>

                <div className="rounded-lg border border-border bg-card/50 p-4 mt-6 space-y-2">
                  <p className="text-sm font-medium">📅 Disponibilidade</p>
                  <p className="text-xs text-muted-foreground">
                    Seg-Sex: 11h30 às 20h
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Sab-Dom: 11h30 às 18h
                  </p>
                </div>
              </div>

              <ReservationForm />
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Footer */}
        <div className="mt-12 rounded-lg border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary mb-2">☕</p>
              <p className="font-medium mb-1">Café Rastreado</p>
              <p className="text-xs text-muted-foreground">
                Conheça a origem de cada grão
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary mb-2">🌱</p>
              <p className="font-medium mb-1">100% Sustentável</p>
              <p className="text-xs text-muted-foreground">
                Embalagem eco-responsável
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary mb-2">💚</p>
              <p className="font-medium mb-1">Comunidade</p>
              <p className="text-xs text-muted-foreground">
                Feito com paixão genuína
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
