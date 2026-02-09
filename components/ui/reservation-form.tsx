"use client";

import { useState } from "react";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

export function ReservationForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  });

  const handleChangeForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setFormData((prev) => ({ ...prev, date, time: "" }));

    // Buscar horários disponíveis
    if (date) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/reservations/available/${date}`
        );
        const slots = await response.json();
        setAvailableSlots(slots);
      } catch (err) {
        console.error("Erro ao buscar disponibilidade:", err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error("Preencha todos os campos obrigatórios");
      }

      if (!formData.date || !formData.time) {
        throw new Error("Selecione data e horário");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reservations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: new Date(formData.date),
            time: formData.time,
            guests: parseInt(formData.guests),
            specialRequests: formData.specialRequests,
          }),
        }
      );

      if (!response.ok) throw new Error("Erro ao criar reserva");

      const reservation = await response.json();
      setReservationId(reservation.reservationId);
      setSuccess(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        specialRequests: "",
      });
      setAvailableSlots([]);

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split("T")[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <div className="space-y-6">
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 flex gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900">Reserva Confirmada!</h3>
            <p className="text-sm text-green-800">
              ID da Reserva: <strong>{reservationId}</strong>
            </p>
            <p className="text-xs text-green-700 mt-1">
              Você receberá uma confirmação por email e WhatsApp
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
            <label className="block text-sm font-medium mb-2">Nome *</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChangeForm}
              placeholder="Seu nome"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChangeForm}
              placeholder="seu@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Telefone *</label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChangeForm}
            placeholder="(11) 9xxxx-xxxx"
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium mb-2">Data *</label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              min={minDate}
              max={maxDate}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Horário *</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChangeForm}
              disabled={!formData.date || availableSlots.length === 0}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Selecione um horário</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Pessoas *</label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChangeForm}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "pessoa" : "pessoas"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Observações Especiais
          </label>
          <Textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChangeForm}
            placeholder="Alergias, preferências de mesa, ocasião especial, etc..."
            rows={3}
          />
        </div>

        <div className="rounded-lg border border-border bg-card/50 p-4">
          <h3 className="font-medium mb-2">📍 Localização</h3>
          <p className="text-sm text-muted-foreground">
            Rua das Flores, 123 - Centro, São Paulo
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            ☕ Ambiente aconchegante para você e seus amigos
          </p>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            "Reservar Mesa"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Confirmaremos sua reserva via email e WhatsApp
        </p>
      </form>
    </div>
  );
}
