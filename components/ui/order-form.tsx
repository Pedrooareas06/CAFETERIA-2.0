"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-api";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

export function OrderForm() {
  const { items, totalPrice, clearCart } = useCart("guest");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (items.length === 0) {
        throw new Error("Seu carrinho está vazio");
      }

      if (!formData.email || !formData.phone || !formData.address) {
        throw new Error("Preencha todos os campos obrigatórios");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            items,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            total: totalPrice,
            paymentMethod: "pending",
            notes: formData.notes,
          }),
        }
      );

      if (!response.ok) throw new Error("Erro ao criar pedido");

      const order = await response.json();
      setOrderId(order.orderId);
      setSuccess(true);
      clearCart();
      setFormData({ email: "", phone: "", address: "", notes: "" });

      // Limpar sucesso após 5 segundos
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">Seu carrinho está vazio</p>
        <a href="#menu" className="mt-4 inline-block">
          <Button>Ver Cardápio</Button>
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 flex gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900">Pedido Criado!</h3>
            <p className="text-sm text-green-800">
              Seu ID de pedido: <strong>{orderId}</strong>
            </p>
            <p className="text-xs text-green-700 mt-1">
              Você receberá um WhatsApp de confirmação em breve
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Erro</h3>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Telefone *</label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 9xxxx-xxxx"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Endereço de Entrega *</label>
          <Textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Rua, número, complemento - Cidade, Estado"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Observações</label>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Alergias, preferências, etc..."
          />
        </div>

        <div className="rounded-lg border border-border bg-card/50 p-4">
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-border">
            <span className="font-medium">Total:</span>
            <span className="text-xl font-bold text-primary">
              R$ {totalPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            ✓ Incluindo taxa de entrega
          </p>
        </div>

        <Button
          type="submit"
          disabled={loading || items.length === 0}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            "Confirmar Pedido"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Você será contactado via WhatsApp para confirmar o pedido
        </p>
      </form>
    </div>
  );
}
