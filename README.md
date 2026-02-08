# Cateria 2.0 ☕

Um site moderno e responsivo para cafeteria com integração de chatbot IA.

## 🎯 Sobre o Projeto

Cateria 2.0 é uma aplicação web construída com Next.js que oferece uma experiência completa para uma cafeteria online. O projeto inclui:

- 🏠 Landing page atrativa com seções hero, menu e depoimentos
- 💬 Chatbot com inteligência artificial (integração OpenAI)
- 🛒 Sistema de carrinho de compras
- 📱 Design totalmente responsivo
- 🎨 Interface moderna com Tailwind CSS e componentes shadcn/ui
- 🌙 Suporte a tema claro/escuro



### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Utilitários CSS
- **shadcn/ui** - Componentes UI acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### IA & Chat
- **Vercel AI SDK** - Integração com modelos de IA
- **OpenAI** - API de modelos de linguagem

### Componentes & Bibliotecas
- **Radix UI** - Primitivos acessíveis
- **Lucide React** - Ícones
- **Sonner** - Sistema de toast notifications
- **Embla Carousel** - Carrossel de imagens

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Chave API do OpenAI

## 🚀 Como Começar

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd cateria-2.0
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

Adicione sua chave API do OpenAI no arquivo `.env.local`:
```env
OPENAI_API_KEY=sua_chave_api_do_openai_aqui
```

### 4. Execute o servidor de desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
cateria-2.0/
├── app/                           # Next.js app directory
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Página inicial
│   ├── globals.css               # Estilos globais
│   └── api/
│       └── chat/
│           └── routes.ts         # API do chatbot IA
├── components/
│   ├── shadcn/                   # Componentes shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── sidebar.tsx
│   │   ├── table.tsx
│   │   └── ...
│   └── ui/                       # Componentes customizados
│       ├── hero-section.tsx      # Seção hero
│       ├── menu-section.tsx      # Seção de menu
│       ├── ai-chatbot.tsx        # Chatbot com IA
│       ├── navigation.tsx        # Navegação
│       ├── features-section.tsx  # Seção de features
│       ├── testimonials.tsx      # Seção de depoimentos
│       ├── Footer.tsx            # Rodapé
│       └── ...
├── hooks/
│   ├── use-scroll-animation.ts   # Hook para animações
│   ├── use-toast.ts              # Hook para notificações
│   └── use-mobile.ts             # Hook para responsividade
├── lib/
│   ├── cart-store.ts             # Lógica do carrinho
│   ├── products.ts               # Dados dos produtos
│   └── utils.ts                  # Utilitários
├── public/                        # Arquivos estáticos
│   └── images/                   # Imagens
├── package.json
├── tailwind.config.ts            # Configuração Tailwind
├── tsconfig.json                 # Configuração TypeScript
├── next.config.mjs               # Configuração Next.js
└── README.md
```

## 🎨 Componentes Principais

### **AI Chatbot** (`ai-chatbot.tsx`)
Chatbot inteligente que se integra com OpenAI para fornecer respostas sobre a cafeteria.

### **Menu Section** (`menu-section.tsx`)
Exibição do menu de produtos da cafeteria com paginação.

### **Hero Section** (`hero-section.tsx`)
Seção inicial atrativa com chamada para ação.

### **Features Section** (`features-section.tsx`)
Destaque das principais características da cafeteria.

### **Testimonials** (`testimonials.tsx`)
Seção de avaliações e depoimentos de clientes.

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Inicia servidor de produção
npm start

# Executa linter
npm run lint
```

## 🛒 Funcionalidades

### Carrinho de Compras
- Adicione produtos ao carrinho
- Visualize itens no carrinho
- Remova produtos
- Cálculo automático de total

### Chat com IA
- Interaja com chatbot alimentado por OpenAI
- Respostas contextualizadas sobre a cafeteria
- Interface amigável e responsiva

### Menu Dinâmico
- Visualize todos os produtos
- Informações detalhadas (preço, descrição)
- Filtros e categorias

## 🎯 Próximas Melhorias

- [ ] Sistema de pagamento integrado
- [ ] Gerenciamento de pedidos
- [ ] Sistema de autenticação de usuários
- [ ] Dashboard administrativo
- [ ] Integração com plataforma de delivery
- [ ] Analytics e métricas

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

### Outras plataformas
O projeto pode ser deployado em qualquer plataforma que suporte Node.js (Netlify, Railway, AWS, etc.).

**Importante:** Certifique-se de:
1. Adicionar a variável de ambiente `OPENAI_API_KEY` na plataforma de deploy
2. Completar as otimizações de build

## 📦 Dependências Principais

```json
{
  "next": "^15.1.3",
  "react": "^19.0.0-rc-66ef0a7f34-20240522",
  "typescript": "^5",
  "tailwindcss": "^3.4.1",
  "@hookform/resolvers": "^3.9.1",
  "react-hook-form": "^7.51.3",
  "zod": "^3.22.4"
}
```

Para a lista completa, veja [package.json](package.json).

## 📄 Licença

Este projeto é privado. Todos os direitos reservados.

## 👤 Autor

Desenvolvido com ☕ e 💖

---

## ❓ Dúvidas ou Sugestões?

Sinta-se livre para abrir uma issue ou entrar em contato.

**Última atualização:** Fevereiro de 2026
