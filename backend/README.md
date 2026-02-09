# Café Raízes - Backend API

Backend NestJS + MongoDB para Café Raízes. Gerencia carrinho de compras, pedidos e dados do cliente com história e rastreabilidade.

## 📋 Pré-requisitos

- **Node.js** 18+ ou superior
- **MongoDB** (local ou MongoDB Atlas)
- **Yarn** ou **npm**

## 🚀 Instalação e Setup

### 1. Instalar dependências

```bash
cd backend
yarn install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do `backend/`:

```bash
cp .env.example .env
```

Edite `.env`:

```env
# MongoDB (local)
MONGODB_URI=mongodb://localhost:27017/cafe-raizes

# ou MongoDB Atlas (cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cafe-raizes

PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Rodar MongoDB localmente (opcional)

Se preferir usar MongoDB local, instale e rode:

```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Windows (com chocolatey)
choco install mongodb

# Linux
sudo apt-get install mongodb
```

Ou use **MongoDB Atlas** (cloud): https://www.mongodb.com/cloud/atlas (free tier disponível)

### 4. Iniciar servidor de desenvolvimento

```bash
yarn dev
# ou
npm run dev
```

Servidor rodará em: **http://localhost:3001**

## 📚 Endpoints da API

### **CART** 🛒

#### Obter carrinho
```http
GET /api/cart?user=userId
```

#### Adicionar item ao carrinho
```http
POST /api/cart/add?user=userId
Content-Type: application/json

{
  "items": [{
    "productId": "espresso",
    "productName": "Espresso",
    "price": 8,
    "quantity": 2,
    "size": "Duplo"
  }],
  "total": 16
}
```

#### Remover item do carrinho
```http
DELETE /api/cart/item?user=userId&productId=espresso
```

#### Atualizar quantidade
```http
PATCH /api/cart/quantity?user=userId&productId=espresso&quantity=3
```

#### Limpar carrinho
```http
DELETE /api/cart/clear?user=userId
```

---

### **ORDERS** 📦

#### Criar novo pedido
```http
POST /api/orders
Content-Type: application/json

{
  "user": "user123",
  "email": "cliente@example.com",
  "phone": "(11) 99999-9999",
  "address": "Rua do Café, 123 - São Paulo, SP",
  "items": [
    {
      "productId": "cappuccino",
      "productName": "Cappuccino",
      "price": 12,
      "quantity": 1,
      "size": "Médio"
    }
  ],
  "total": 12,
  "paymentMethod": "credit-card",
  "notes": "Sem açúcar, por favor"
}
```

#### Listar todos os pedidos
```http
GET /api/orders
```

#### Obter pedido específico
```http
GET /api/orders/ORD-1708000000000-ABC123
```

#### Obter pedidos por email
```http
GET /api/orders/user/cliente@example.com
```

#### Atualizar status do pedido
```http
PATCH /api/orders/ORD-1708000000000-ABC123/status
Content-Type: application/json

{
  "status": "confirmed"
}
```

**Status válidos:** `pending`, `confirmed`, `shipped`, `delivered`

#### Cancelar pedido
```http
DELETE /api/orders/ORD-1708000000000-ABC123
```

#### Obter estatísticas
```http
GET /api/orders/stats/summary
```

---

## 🔗 Integrar com Frontend (Next.js)

Exemplo de como chamar a API from frontend:

```typescript
// Adicionar ao carrinho
const addToCart = async (product: Product, quantity: number) => {
  const response = await fetch('http://localhost:3001/api/cart/add?user=guest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        size: 'Medium'
      }],
      total: product.price * quantity
    })
  });
  
  const cart = await response.json();
  console.log('Carrinho atualizado:', cart);
};
```

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── main.ts                 # Entry point
│   ├── app.module.ts           # Módulo principal
│   ├── cart/
│   │   ├── cart.controller.ts
│   │   ├── cart.service.ts
│   │   ├── cart.module.ts
│   │   ├── dto/
│   │   │   └── create-cart.dto.ts
│   │   └── schemas/
│   │       └── cart.schema.ts
│   └── orders/
│       ├── orders.controller.ts
│       ├── orders.service.ts
│       ├── orders.module.ts
│       ├── dto/
│       │   └── create-order.dto.ts
│       └── schemas/
│           └── order.schema.ts
├── dist/                       # Build output
├── .env                        # Variáveis de ambiente (não commitar)
├── .env.example                # Template de .env
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Scripts Disponíveis

```bash
yarn dev       # Rodar em modo desenvolvimento (com hot reload)
yarn build     # Compilar para produção
yarn start     # Rodar versão compilada
yarn format    # Formatar código com Prettier
```

## 💾 MongoDB Estrutura

### Coleção: `carts`
```json
{
  "_id": ObjectId,
  "user": "userId",
  "items": [
    {
      "productId": "espresso",
      "productName": "Espresso",
      "price": 8,
      "quantity": 2,
      "size": "Duplo"
    }
  ],
  "total": 16,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Coleção: `orders`
```json
{
  "_id": ObjectId,
  "orderId": "ORD-1708000000000-ABC123",
  "user": "userId",
  "email": "cliente@example.com",
  "phone": "(11) 99999-9999",
  "address": "Rua do Café, 123",
  "items": [...],
  "total": 50,
  "status": "pending",
  "paymentMethod": "credit-card",
  "notes": "Sem açúcar",
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

## 🔒 Segurança

- [ ] Adicionar autenticação (JWT)
- [ ] Implementar validação de entrada com `class-validator`
- [ ] Usar rate limiting
- [ ] Adicionar logs e monitoramento

## 📦 Deployment

### Vercel (Backend + Frontend)

1. **Crie um novo projeto no Vercel**
2. **Conecte seu repositório GitHub**
3. **Configure build command:**
   ```bash
   cd backend && yarn build && cd ..
   ```
4. **Configure install command:**
   ```bash
   yarn install && cd backend && yarn install && cd ..
   ```

### Heroku

```bash
# Fazer login
heroku login

# Criar app
heroku create cafe-raizes-api

# Setar variáveis de ambiente
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

## 📝 Próximas Features

- [ ] Autenticação com JWT
- [ ] Integração com Stripe (pagamentos)
- [ ] Sistema de avaliações
- [ ] Notificações por email
- [ ] Dashboard admin

---

**Made with ☕ and Node.js**
