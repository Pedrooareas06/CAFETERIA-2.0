# Integração Frontend + Backend - Guia Passo-a-Passo

## 📋 Resumo

O backend NestJS foi criado com:
- **Cart API**: Gerencia carrinho de compras persistido em MongoDB
- **Orders API**: Gerencia pedidos com status e rastreamento

O frontend está pronto para integração. Siga os passos abaixo para conectar tudo.

---

## 🚀 PASSO 1: Instalar Dependências do Backend

```bash
cd backend
yarn install
```

**Espere** até que todas as dependências sejam instaladas (~2 minutos).

---

## 🗄️ PASSO 2: Configurar MongoDB

Escolha uma opção:

### Opção A: MongoDB Local (Mais Rápido para Dev)
1. Baixe MongoDB Community: https://www.mongodb.com/try/download/community
2. Instale seguindo o installer
3. MongoDB estará rodando em `mongodb://localhost:27017` por padrão

### Opção B: MongoDB Atlas (Cloud - Recomendado para Deploy)
1. Acesse https://www.mongodb.com/cloud/atlas
2. Crie conta gratuita
3. Crie um cluster (free tier)
4. Na section "Security", autorize seu IP (Network Access)
5. Copie connection string: `mongodb+srv://usuario:senha@cluster.mongodb.net/cafe-raizes?retryWrites=true&w=majority`
6. Atualize em `backend/.env`:

```bash
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/cafe-raizes?retryWrites=true&w=majority
```

**Valide a configuração executando:**
```bash
# voltando para raiz do projeto
cd ..

# testar conexão
node -e "const mongoose = require('mongoose'); require('dotenv').config({path: './backend/.env'}); mongoose.connect(process.env.MONGODB_URI).then(() => { console.log('✅ MongoDB conectado!'); process.exit(0); }).catch(e => { console.error('❌ Erro:', e.message); process.exit(1); });"
```

---

## 🔧 PASSO 3: Iniciar Backend

Em um terminal separado (deixe rodando):

```bash
cd backend
yarn dev
```

Esperado:
```
[Nest] 12345  - 01/01/2024, 10:30:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 01/01/2024, 10:30:00 AM     LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345  - 01/01/2024, 10:30:00 AM     LOG [NestApplication] Nest application successfully started
Backend is running on: http://localhost:3001
```

Se não conectar a MongoDB, aparecerá erro. Valide o MONGODB_URI no `.env`.

---

## 🌐 PASSO 4: Iniciar Frontend

Em outro terminal:

```bash
yarn dev
```

Esperado:
```
  ▲ Next.js 14.x
  - ready started server on ...
  - event compiled successfully
  - event compiled client and server successfully
```

Acesse: http://localhost:3000

---

## 🧪 PASSO 5: Testar Endpoints

Use curl ou Postman para validar:

### Teste 1: Adicionar Item ao Carrinho
```bash
curl -X POST http://localhost:3001/api/cart/add?user=guest \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "1",
    "name": "Café Premium",
    "image": "/images/cafe.jpg",
    "size": "500g",
    "price": 35.00
  }'
```

Esperado:
```json
{
  "items": [
    {
      "productId": "1",
      "name": "Café Premium",
      "image": "/images/cafe.jpg",
      "size": "500g",
      "price": 35.00,
      "quantity": 1
    }
  ],
  "total": 35.00
}
```

### Teste 2: Recuperar Carrinho
```bash
curl http://localhost:3001/api/cart?user=guest
```

### Teste 3: Criar Pedido
```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productId": "1",
        "productName": "Café Premium",
        "price": 35.00,
        "quantity": 1,
        "size": "500g",
        "image": "/images/cafe.jpg"
      }
    ],
    "email": "cliente@example.com",
    "phone": "(11) 98765-4321",
    "address": "Rua Test, 123 - São Paulo",
    "total": 35.00,
    "paymentMethod": "debit_card"
  }'
```

Esperado:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "orderId": "ORD-20250101-ABC123",
  "items": [...],
  "status": "pending",
  "email": "cliente@example.com",
  "phone": "(11) 98765-4321",
  "address": "Rua Test, 123 - São Paulo",
  "total": 35.00,
  "paymentMethod": "debit_card",
  "createdAt": "2025-01-01T10:30:00.000Z"
}
```

---

## 💻 PASSO 6: Integrar No Frontend

Para usar a API do backend em componentes React, importe `useCart` do novo arquivo:

### ❌ ANTES (localStorage)
```typescript
import { useCart } from '@/lib/cart-store';
```

### ✅ DEPOIS (API Backend)
```typescript
import { useCart } from '@/lib/cart-api';

export function MyComponent() {
  const { items, addItem, removeItem, totalPrice } = useCart('guest');
  
  // Resto do código igual... useCart agora chama backend!
}
```

**Importante**: A interface é 100% igual, então componentes existentes funcionam sem mudanças!

---

## 📱 Exemplo: Adicionar Item do Catálogo

```typescript
// components/ui/menu-section.tsx
import { useCart } from '@/lib/cart-api'; // MUDAR AQUI

export function MenuSection() {
  const { addItem } = useCart('guest');

  return (
    <button 
      onClick={() => addItem({
        productId: '1',
        name: 'Café Raízes Premium - Etiópia'
        image: '/images/cafe-premium.jpg',
        size: '500g',
        price: 35.00
      })}
    >
      Adicionar ao Carrinho
    </button>
  );
}
```

---

## 🛒 Exemplo: Mostrar Carrinho

```typescript
import { useCart } from '@/lib/cart-api';

export function CartSummary() {
  const { items, totalPrice, removeItem } = useCart('guest');

  return (
    <div>
      {items.map(item => (
        <div key={`${item.productId}-${item.size}`}>
          <span>{item.name} x{item.quantity}</span>
          <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
          <button onClick={() => removeItem(item.productId, item.size)}>
            Remover
          </button>
        </div>
      ))}
      <p>Total: R$ {totalPrice.toFixed(2)}</p>
    </div>
  );
}
```

---

## 📦 Exemplo: Enviar Pedido

```typescript
import { useCart } from '@/lib/cart-api';

export async function submitOrder(
  cartItems: CartItem[],
  email: string,
  phone: string,
  address: string
) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: cartItems,
      email,
      phone,
      address,
      total,
      paymentMethod: 'debit_card' // ou outro método
    })
  });

  const order = await response.json();
  return order.orderId; // Retorna ID do pedido ex: "ORD-20250101-ABC123"
}
```

---

## 🔍 Verificar Status do Pedido

```typescript
export async function getOrderStatus(orderId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`
  );
  const order = await response.json();
  
  return {
    status: order.status, // 'pending', 'confirmed', 'shipped', 'delivered'
    createdAt: order.createdAt,
    total: order.total
  };
}
```

---

## 🐛 Troubleshooting

### Backend não conecta a MongoDB
**Solução**: Verifique `backend/.env` e execute:
```bash
echo "MONGODB_URI=mongodb://localhost:27017/cafe-raizes" > backend/.env
```

### CORS Error no Frontend
**Solução**: Confirmado que backend `.env` tem:
```
FRONTEND_URL=http://localhost:3000
```

### Porta 3001 já em uso
**Solução**: Mude em `backend/.env`:
```
PORT=3002
```
E atualize frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3002
```

### Carrinhos desaparecem ao recarregar página
✅ **Normal (esperado)**: Cada user=guest tem carrinho separado

---

## ✅ Checklist de Sucesso

Marca como ✅ quando completar:

- [ ] Backend instalado (`yarn install` em backend/)
- [ ] MongoDB rodando (local ou Atlas)
- [ ] Backend iniciado (`yarn dev` em backend/)
- [ ] Frontend iniciado (`yarn dev` na raiz)
- [ ] Teste 1: Adicionar item ao carrinho (curl)
- [ ] Teste 2: Recuperar carrinho (curl)
- [ ] Teste 3: Criar pedido (curl)
- [ ] Importou `useCart` de `lib/cart-api` em um componente
- [ ] Componente renderiza itens do carrinho
- [ ] Botão "Adicionar ao Carrinho" funciona sem erros
- [ ] Total do carrinho atualiza corretamente

---

## 📚 Próximos Passos

1. **Autenticação**: Adicionar JWT para diferenciar usuários
2. **Pagamento**: Integrar Stripe ou MercadoPago
3. **Email**: Enviar confirmação de pedido
4. **Admin Dashboard**: Painel para gerenciar pedidos
5. **Deploy**: Publicar frontend em Vercel + backend em Railway/Render

---

## 💬 Dúvidas?

Se receber erros, verifique em ordem:
1. MongoDB conectando? → Teste `mongodb://localhost:27017` no Compass
2. Backend rodando? → Porta 3001 acessível?
3. Frontend conectando? → Network tab do DevTools mostra status 200?
4. Variáveis de ambiente? → `.env` (backend) e `.env.local` (frontend) corretos?
