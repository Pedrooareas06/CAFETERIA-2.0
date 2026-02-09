# ✅ Backend NestJS + MongoDB - Implementação Completa

## 📦 O Que Foi Criado

### Backend Structure (`/backend`)
```
backend/
├── src/
│   ├── main.ts                    ← Bootstrap do NestJS com CORS
│   ├── app.module.ts              ← Configuração MongoDB + módulos
│   ├── cart/
│   │   ├── cart.schema.ts         ← Modelo MongoDB para carrinho
│   │   ├── cart.dto.ts            ← Data Transfer Objects
│   │   ├── cart.service.ts        ← Lógica de negócio
│   │   ├── cart.controller.ts     ← 5 endpoints HTTP
│   │   └── cart.module.ts         ← Modulo NestJS
│   └── orders/
│       ├── orders.schema.ts       ← Modelo MongoDB para pedidos
│       ├── orders.dto.ts          ← Data Transfer Objects
│       ├── orders.service.ts      ← Lógica de negócio + stats
│       ├── orders.controller.ts   ← 6 endpoints HTTP
│       └── orders.module.ts       ← Modulo NestJS
├── package.json                   ← Dependências NestJS + MongoDB
├── tsconfig.json                  ← Configuração TypeScript
├── .env.example                   ← Template variáveis
├── .env                           ← Configurações atuais
├── .gitignore                     ← Ignora node_modules, .env
└── README.md                      ← Documentação completa
```

### Frontend Updates (`/app`)
```
lib/
├── cart-store.ts     ← ANTIGO: localStorage (mantido para referência)
└── cart-api.ts       ← NOVO: Chama backend via API
```

### Arquivos de Configuração
```
.env.local            ← NEXT_PUBLIC_API_URL=http://localhost:3001
INTEGRATION.md        ← Guia completo de integração
```

---

## 🎯 Endpoints Disponíveis

### 🛒 Cart Endpoints (`/api/cart`)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/cart?user=guest` | Recupera carrinho de um usuário |
| POST | `/api/cart/add?user=guest` | Adiciona item ao carrinho |
| DELETE | `/api/cart/item?user=guest&productId=1&size=500g` | Remove item |
| PATCH | `/api/cart/quantity?user=guest&productId=1&size=500g&quantity=2` | Atualiza quantidade |
| DELETE | `/api/cart/clear?user=guest` | Limpa carrinho todo |

### 📦 Orders Endpoints (`/api/orders`)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/orders` | Cria novo pedido |
| GET | `/api/orders` | Lista todos os pedidos |
| GET | `/api/orders/:orderId` | Busca pedido por ID |
| GET | `/api/orders/user/:email` | Busca pedidos de um email |
| PATCH | `/api/orders/:orderId/status` | Atualiza status do pedido |
| DELETE | `/api/orders/:orderId` | Cancela pedido |
| GET | `/api/orders/stats/summary` | Estatísticas (total, status count) |

---

## 🚀 Como Começar

### 1️⃣ Instalar Backend
```bash
cd backend
yarn install
```

### 2️⃣ Configurar MongoDB
Escolha: Local OU MongoDB Atlas (veja INTEGRATION.md passo 2)

### 3️⃣ Rodar Backend (Terminal 1)
```bash
cd backend
yarn dev
```
✅ Esperado: `Backend is running on: http://localhost:3001`

### 4️⃣ Rodar Frontend (Terminal 2)
```bash
yarn dev
```
✅ Esperado: `ready started server on 0.0.0.0:3000`

### 5️⃣ Testar Endpoints
```bash
# Adicionar item
curl -X POST http://localhost:3001/api/cart/add?user=guest \
  -H "Content-Type: application/json" \
  -d '{"productId":"1","name":"Café","image":"/img.jpg","size":"500g","price":35}'

# Recuperar carrinho
curl http://localhost:3001/api/cart?user=guest
```

---

## 💡 Para Usar No Frontend

### ✅ Agora (Com Backend)
```typescript
import { useCart } from '@/lib/cart-api'; // ← NOVO: chama API

export function Menu() {
  const { items, addItem, totalPrice } = useCart('guest');
  
  return (
    <button onClick={() => addItem({
      productId: '1',
      name: 'Café Premium',
      image: '/cafe.jpg',
      size: '500g',
      price: 35
    })}>
      Adicionar
    </button>
  );
}
```

Interface é **100% igual**, não precisa mudar componentes existentes!

---

## 📊 Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
│  ├─ page.tsx                                                │
│  ├─ components/                                             │
│  └─ lib/cart-api.ts ← Chama backend via fetch()           │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTP (CORS ✅)
                 ├─ GET/POST /api/cart
                 ├─ DELETE /api/cart/item
                 ├─ PATCH /api/cart/quantity
                 ├─ POST /api/orders
                 └─ GET /api/orders/:orderId
                 │
┌────────────────┴────────────────────────────────────────────┐
│                  BACKEND (NestJS)                            │
│  ├─ app.module.ts                                          │
│  ├─ cart/                                                   │
│  │  ├─ cart.service.ts ←──┐                               │
│  │  └─ cart.controller.ts  │ Business Logic              │
│  └─ orders/                                                │
│     ├─ orders.service.ts ←─┼─ Queries/Updates DB         │
│     └─ orders.controller.ts │                            │
└────────────────┬────────────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────────────┐
│               MongoDB (Atlas ou Local)                       │
│  ├─ carts collection                                        │
│  │  └─ { _id, user, items[], total, createdAt }          │
│  └─ orders collection                                       │
│     └─ { _id, orderId, items[], status, email, ... }      │
└──────────────────────────────────────────────────────────────┘
```

---

## 📝 Arquivo de Integração

Abra [INTEGRATION.md](./INTEGRATION.md) para:
- ✅ Passo-a-passo completo
- ✅ Exemplos de curl para cada endpoint
- ✅ Configuração MongoDB Atlas
- ✅ Troubleshooting de erros comuns
- ✅ Exemplos de código React

---

## 🎉 Próximos Passos (Opcional)

1. **Autenticação JWT** - Identificar usuários reais
2. **Integração Pagamento** - Stripe ou MercadoPago
3. **Email** - Confirmação de pedido automática
4. **Admin Dashboard** - Gerenciar pedidos e clientes
5. **Deploy**:
   - Frontend → Vercel
   - Backend → Railway.app ou Render.com

---

## 📞 Checklist de Funcionamento

Quando terminar, você terá:

- [ ] Backend rodando em http://localhost:3001
- [ ] MongoDB conectado com sucesso
- [ ] Frontend rodando em http://localhost:3000
- [ ] `yarn dev:all` roda ambos os serviços juntos
- [ ] Cart API funcionando (teste com curl)
- [ ] Orders API funcionando
- [ ] Frontend consegue adicionar itens ao carrinho
- [ ] Carrinho persiste em MongoDB
- [ ] Novos pedidos salvam com orderId único

---

## 🎓 O Que Você Aprendeu

✅ **NestJS**: Framework TypeScript para backend estruturado
✅ **MongoDB**: Database NoSQL flexível com Mongoose
✅ **CORS**: Como frontend comunica com backend
✅ **DTOs**: Como definir dados transito (request/response)
✅ **API RESTful**: Endpoints GET/POST/DELETE/PATCH
✅ **Environment Variables**: Configuração segura (.env)
✅ **Integration Pattern**: Como conectar frontend + backend

---

**Status: ✅ PRONTO PARA USAR**

Execute: `yarn backend:install` && `yarn dev:all`

Dúvidas? Veja [INTEGRATION.md](./INTEGRATION.md) 📖
