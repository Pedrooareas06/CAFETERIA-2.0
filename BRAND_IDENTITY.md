# 🎨 Café Raízes - Identidade Visual & Branding

## Paleta de Cores

A identidade visual de **Café Raízes** reflete a conexão entre terra, café e natureza.

```
┌─────────────────────────────────────┐
│ COR PRIMÁRIA: Terra e Café          │
│ #8B6F47 (Marrom Café)               │
│ RGB: (139, 111, 71)                 │
│ Uso: Logo, headings, CTAs           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ COR SECUNDÁRIA: Raízes              │
│ #4A3728 (Marrom Escuro)             │
│ RGB: (74, 55, 40)                   │
│ Uso: Texto destacado, footers       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ COR TERCIÁRIA: Natureza             │
│ #2D5016 (Verde Natural)             │
│ RGB: (45, 80, 22)                   │
│ Uso: Ícones, destaques, accent      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ COR QUARTA: Esperança/Futuro        │
│ #F5DEB3 (Bege Claro - Palha)        │
│ RGB: (245, 222, 179)                │
│ Uso: Backgrounds, card backgrounds  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ DOURADO DESTAQUE: Qualidade         │
│ #D4AF37 (Dourado)                   │
│ RGB: (212, 175, 55)                 │
│ Uso: Badges, prêmios, premium       │
└─────────────────────────────────────┘
```

**Aplicação Gradiente (Hero Section):**
```
from-amber-800 to-amber-600
(#B45309 → #D97706)
```

---

## Tipografia

### Fontes Utilizadas

```
┌──────────────────────────────────┐
│ SERIF (Elegância, Tradição)      │
│ Playfair Display                 │
│ Peso: 400, 700, 800              │
│ Uso: Logo, títulos, headings     │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ SANS-SERIF (Legibilidade)        │
│ Inter (fallback: system-ui)       │
│ Peso: 400, 500, 600, 700         │
│ Uso: Body text, menu, botões     │
└──────────────────────────────────┘
```

---

## Logo

### Conceito

A logo reflete três elementos:
- 🌱 **Raiz** (símbolo de origem)
- ☕ **Xícara** (café)
- 🔗 **Conexão** (histórias ligadas)

```
Formato: Marca-símbolo + Wordmark
Estilo: Minimalista, moderno, rastreável
Cores: Marrom primário + verde natura
Variações: Full color, monocromático, invertido
```

### Uso Correto

✅ Mostrar sempre com espaçamento mínimo  
✅ Nunca distorcer ou redimensionar desproporcionalmente  
✅ Manter clara legibilidade mesmo em tamanhos pequenos  
✅ Em fundo escuro: inverter para claro (branco/bege)  

---

## Iconografia

Todos os ícones seguem:
- **Estilo:** Rounded, orgânico
- **Peso:** 1.5-2px de stroke
- **Paleta:** Verde natural (#2D5016) e marrom café (#8B6F47)
- **Biblioteca:** Lucide React (icons utilizadas no projeto)

### Ícones Principais

```
🌍 Origem (Globe)
♻️ Sustentabilidade (Leaf/Recycle)
❤️ Paixão (Heart)
📍 Localização (MapPin)
☕ Café (Coffee)
🌱 Raízes (Sprout)
```

---

## Imagética e Fotografia

### Estética

- **Estilo:** Autêntico, documental, com alma
- **Tons:** Warmth natural, luzes douradas
- **Composição:** Pessoas, mãos, detalhes do café
- **Valores:** Humanidade, sustentabilidade, qualidade

### Imagens-Chave

```
📸 Fazenda (contexto de origem)
📸 Produtor (conexão humana)
📸 Grãos de café (detalhe artesanal)
📸 Barista trabalhando (paixão)
📸 Comunidade (eventos, pessoas)
📸 Ambiente da cafeteria (aconchego)
📸 Xícara de café (produto final)
```

---

## Tom de Voz

### Características

- ✍️ **Autêntico:** Conversamos como pessoas reais
- ✍️ **Erudito:** Conhecimento genuíno sobre café
- ✍️ **Apaixonado:** Sentimento genuíno pela qualidade
- ✍️ **Acessível:** Explicamos sem ser condescendente
- ✍️ **Inspirador:** Motivamos a conexão com origem

### Exemplos

❌ **Não:** "Produto premium de alta qualidade"  
✅ **Sim:** "Café cultivado por famílias que acordam cedo. Você vai sentir a dedicação em cada gole."

❌ **Não:** "Bebida artesanal especial"  
✅ **Sim:** "Conheca a história de quem plantou seu café"

---

## Componentes de Design

### Buttons
- **Primário:** Fundo marrom café (#8B6F47), texto branco
- **Secundário:** Fundo transparente, border marrom, hover com green
- **Estado hover:** Transição suave com sombra
- **Tamanhos:** SM (32px), MD (40px), LG (48px)

### Cards
- **Background:** Bege claro (#F5DEB3) ou branco
- **Border:** Sutil, couleur marrom escuro com 10% opacity
- **Sombra:** `shadow-md` com cor marrom em 20% opacity
- **Hover:** Elevate com movimento suave

### Forms
- **Input:** Border marrom claro, focus com cor verde
- **Label:** Texto marrom escuro, bold em destaque
- **Error:** Cor vermelha com ícone
- **Success:** Cor verde com checkmark

### Gradientes
- **Hero:** from-amber-800 to-amber-600
- **Feature:** from-emerald-50 to-transparent
- **Footer:** Marrom escuro a preto

---

## Spacings & Grid

```
Base: 8px
Pequeno: 0.25rem (2px)
Médio: 0.5rem (4px)
Normal: 1rem (8px)
Grande: 1.5rem (12px)
X-Grande: 2rem (16px)
XXL: 3rem (24px)

Grid: 12 colunas
Breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
```

---

## Padrões e Microinterações

### Loading
- Animação com símbolo de xícara/café rotacionando
- Cor: Dourado (#D4AF37)
- Duração: 1.5s

### Transitions
- Padrão: 200-300ms ease-in-out
- Hover: 150ms ease-out
- Modal: 300ms ease

### Feedback
- ✅ Sucesso: Checkmark verde + toast notification
- ❌ Erro: X vermelho + mensagem descritiva
- ℹ️ Info: Ícone azul + notificação

---

## Acessibilidade

### Contraste
- Texto marrom sobre bege: ✅ WCAG AA
- Botões: ✅ 4:5:1 minimum ratio
- Focus states: ✅ Outline visível 2px

### Keyboard Navigation
- ✅ Todos elementos focáveis
- ✅ Tab order lógico
- ✅ Escape para fechar modals

### Screen Readers
- ✅ Aria-labels em ícones
- ✅ Headings semânticas
- ✅ Botões com labels claros

---

## Aplicações

### Digital
- 💻 Website
- 📱 App Mobile
- 📧 Email marketing
- 🎨 Social media

### Print
- 🏷️ Rótulos de café / Packaging
- 🎫 Cartões de visita
- 📰 Cartazes
- 🎁 Embalagens

### Ambiente
- 🏪 Sinalização da cafeteria
- 🪴 Elementos decorativos
- 👕 Uniforme baristas
- ☕ Xícaras branded

---

## Diretrizes de Marca

1. **Nunca** comprometer na qualidade por economia
2. **Sempre** contar a história por trás
3. **Manter** autenticidade em todas comunicações
4. **Respeitar** origem, produtores, natureza
5. **Conectar** pessoas com pessoas
6. **Inovar** sem perder tradição

---

*Café Raízes é mais que visual. É um compromisso com histórias reais, qualidade genuína e conexão humana.* 🌱☕

