# Cateria 2.0 ☕

Site moderno para cafeteria com chatbot IA integrado.

## 🚀 Tecnologias

- **Next.js** + **TypeScript** - Framework e tipagem
- **Tailwind CSS** - Estilização responsiva  
- **OpenAI API** - Chatbot com IA
- **shadcn/ui** - Componentes modernos
- **React Hook Form** - Gerenciamento de formulários

## 📦 Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>
cd cateria-2.0

# Instale as dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local
# Adicione sua OPENAI_API_KEY no .env.local

# Inicie o servidor
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🛠️ Scripts

```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm start        # Iniciar servidor
npm run lint     # Executar linter
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
