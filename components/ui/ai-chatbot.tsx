"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Coffee, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages,
            { role: "user", content: input },
          ],
        }),
      });

      if (!response.ok) throw new Error("Erro ao enviar mensagem");

      let fullContent = "";
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value);
          const lines = text.split("\n");

          for (const line of lines) {
            if (line.startsWith("0:")) {
              const jsonStr = line.slice(2);
              try {
                const data = JSON.parse(jsonStr);
                if (data.type === "text-delta" && data.textDelta) {
                  fullContent += data.textDelta;
                }
              } catch (e) {
                // Ignorar erros de parse
              }
            }
          }
        }
      }

      if (fullContent) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: fullContent,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickMessages = [
    "Qual o cardapio?",
    "Horario de funcionamento?",
    "Me recomende um cafe",
  ];

  return (
    <>
      {/* Chat Button */}
      {isVisible && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all duration-500 ${
            isOpen
              ? "bg-secondary text-foreground rotate-90"
              : "bg-primary text-primary-foreground hover:scale-110 hover:shadow-primary/30 animate-pulse-glow"
          }`}
          aria-label={isOpen ? "Fechar assistente" : "Abrir assistente IA"}
        >
          {isOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
        </button>
      )}

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[380px] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl transition-all duration-500 ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border/60 bg-secondary/50 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Barista Virtual
            </p>
            <p className="text-xs text-muted-foreground">
              Assistente IA do Cafe Aroma
            </p>
          </div>
          <div className="ml-auto flex h-2 w-2 rounded-full bg-[#25D366]" />
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Coffee className="mb-4 h-10 w-10 text-primary/30" />
              <p className="text-sm font-medium text-foreground">
                Ola! Sou o Barista Virtual.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Como posso ajudar voce hoje?
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {quickMessages.map((msg) => (
                  <button
                    key={msg}
                    type="button"
                    onClick={() => {
                      setInput(msg);
                      setTimeout(() => {
                        const form = document.querySelector("form");
                        if (form) form.dispatchEvent(new Event("submit", { bubbles: true }));
                      }, 0);
                    }}
                    className="rounded-full border border-border bg-secondary/50 px-4 py-2 text-xs text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-foreground hover:bg-primary/5"
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-secondary px-4 py-3">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border/60 bg-secondary/30 px-4 py-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:scale-105 disabled:opacity-30"
            aria-label="Enviar mensagem"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </>
  );
}
