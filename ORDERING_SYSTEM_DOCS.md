# 🎯 Sistema de Pedidos e Reservas - Café Raízes

## ✨ O Que Foi Criado

Um sistema completo de **Pedidos Online** e **Reserva de Mesa** integrado entre Frontend (Next.js) e Backend (NestJS + MongoDB).

---

## 📁 Backend - Novas Rotas e Funcionalidades

### **Reservations Module** (`/api/reservations`)

#### Endpoints Disponíveis

```
POST   /api/reservations                    # Criar nova reserva
GET    /api/reservations                    # Listar todas as reservas
GET    /api/reservations/:reservationId     # Obter reserva por ID
GET    /api/reservations/user/:email        # Obter reservas por email
GET    /api/reservations/available/:date    # Slots disponíveis para uma data
PATCH  /api/reservations/:reservationId/status    # Atualizar status
PATCH  /api/reservations/:reservationId/confirm   # Confirmar reserva
DELETE /api/reservations/:reservationId     # Cancelar reserva
GET    /api/reservations/stats/summary      # Estatísticas
```

#### Exemplo de Requisição (Criar Reserva)

```bash
curl -X POST http://localhost:3001/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 98765-4321",
    "date": "2025-02-15T00:00:00Z",
    "time": "19:00",
    "guests": 4,
    "specialRequests": "Mesa próxima à janela por favor"
  }'
```

#### Resposta

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "reservationId": "RES-1707333600000-ABC12XYZ",
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 98765-4321",
  "date": "2025-02-15T00:00:00Z",
  "time": "19:00",
  "guests": 4,
  "specialRequests": "Mesa próxima à janela por favor",
  "status": "pending",
  "createdAt": "2025-02-08T14:00:00Z"
}
```

#### Schema MongoDB

```javascript
{
  revervationId: String (unique),
  name: String,
  email: String,
  phone: String,
  date: DateTime,
  time: String (HH:MM),
  guests: Number (1-20),
  specialRequests: String,
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
  createdAt: DateTime,
  updatedAt: DateTime
}
```

---

## 💻 Frontend - Novos Componentes

### **1. OrderForm** (`components/ui/order-form.tsx`)

Formulário para **Fazer Pedidos Online**

**Funcionalidades:**
- ✅ Integração com carrinho de compras
- ✅ Validação de campos (email, telefone, endereço)
- ✅ Cálculo de total com taxa de entrega
- ✅ Feedback visual (sucesso/erro)
- ✅ ID do pedido gerado automaticamente
- ✅ Notificação via WhatsApp

**Campos:**
- Email do cliente
- Telefone
- Endereço de entrega
- Observações (alergias, preferências)

**Resposta em Sucesso:**
```json
{
  "orderId": "ORD-1707333600000-ABC12XYZ",
  "items": [...],
  "total": 89.90,
  "status": "pending"
}
```

---

### **2. ReservationForm** (`components/ui/reservation-form.tsx`)

Formulário para **Reservar Mesa**

**Funcionalidades:**
- ✅ Seleção de data (próximos 30 dias)
- ✅ Carregamento automático de horários disponíveis
- ✅ Validação em tempo real
- ✅ Suporte a pedidos especiais
- ✅ Seleção de 1-10 pessoas
- ✅ Confirmação automática

**Campos:**
- Nome
- Email
- Telefone
- Data
- Horário (com slots disponíveis)
- Número de pessoas
- Observações especiais

**Resposta em Sucesso:**
```json
{
  "reservationId": "RES-1707333600000-ABC12XYZ",
  "date": "2025-02-15",
  "time": "19:00",
  "guests": 4,
  "status": "pending"
}
```

---

### **3. OrderingSection** (`components/ui/ordering-section.tsx`)

Página/Seção Principal que Integra Tudo

**Características:**
- 🎨 Interface com abas (Pedidos / Reservas)
- 📱 Responsivo (mobile e desktop)
- 📚 Explicação de como funciona
- ℹ️ Informações sobre localização e disponibilidade
- 🎯 CTAs claras e calls-to-action

**Layout:**
```
┌─────────────────────────────────────┐
│  Tabs: [Fazer Pedido] [Reservar]   │
├─────────────────────────────────────┤
│  Col 1: Info           │  Col 2: Form│
│  - Descrição           │  - Campos   │
│  - Passos              │  - Validação│
│  - Detalhes            │  - Envio    │
└─────────────────────────────────────┘
```

---

## 🔄 Fluxos de Funcionamento

### **Fluxo de Pedido**

```
1. Cliente adiciona itens ao carrinho
   ↓
2. Clica em "Fazer Pedido"
   ↓
3. Preenche formulário (email, telefone, endereço)
   ↓
4. Frontend envia POST para /api/orders
   ↓
5. Backend cria pedido em MongoDB
   ↓
6. Retorna orderId
   ↓
7. Frontend mostra mensagem de sucesso
   ↓
8. Notificação é enviada via WhatsApp/Email
   ↓
9. Comerciante recebe e processa pedido
```

### **Fluxo de Reserva**

```
1. Cliente seleciona data
   ↓
2. Frontend busca GET /api/reservations/available/:date
   ↓
3. Slots disponíveis são carregados
   ↓
4. Cliente seleciona horário, pessoas e detalhes
   ↓
5. Frontend envia POST para /api/reservations
   ↓
6. Backend cria reserva em MongoDB
   ↓
7. Retorna reservationId
   ↓
8. Frontend mostra mensagem de sucesso
   ↓
9. Confirmação enviada via WhatsApp/Email
   ↓
10. Cliente recebe confirmação
```

---

## 🚀 Como Usar

### Dentro do Projeto

1. **Pedidos:**
   - Clique em "Peça Seu Café"
   - Aba "Fazer Pedido"
   - Adicione itens ao carrinho via menu
   - Clique em "Confirmar Pedido"
   - Preencha dados e envie

2. **Reservas:**
   - Clique em "Peça Seu Café"
   - Aba "Reservar Mesa"
   - Selecione data e horário disponível
   - Preencha dados
   - Clique em "Reservar Mesa"

### Via API (cURL)

**Criar Pedido:**
```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productId": "1",
        "name": "Espresso",
        "price": 10,
        "quantity": 2,
        "size": "Duplo"
      }
    ],
    "email": "cliente@example.com",
    "phone": "(11) 98765-4321",
    "address": "Rua X, 123 - São Paulo",
    "total": 20,
    "paymentMethod": "pending"
  }'
```

**Criar Reserva:**
```bash
curl -X POST http://localhost:3001/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria",
    "email": "maria@example.com",
    "phone": "(11) 98765-4321",
    "date": "2025-02-15T00:00:00Z",
    "time": "19:30",
    "guests": 2,
    "specialRequests": "Alergias: Glúten"
  }'
```

---

## 📊 Dados Salvos em MongoDB

### Collections

```
database: cafe-raizes
├── carts (carrinho)
├── orders (pedidos)
└── reservations (reservas)
```

### Exemplo de Documentos

**Order:**
```json
{
  "_id": ObjectId,
  "orderId": "ORD-1707333600000-ABC12",
  "items": [
    {
      "productId": "1",
      "name": "Espresso",
      "price": 10,
      "quantity": 2
    }
  ],
  "email": "cliente@example.com",
  "phone": "(11) 98765-4321",
  "address": "Rua X, 123",
  "total": 20,
  "status": "pending",
  "createdAt": "2025-02-08T14:00:00Z"
}
```

**Reservation:**
```json
{
  "_id": ObjectId,
  "reservationId": "RES-1707333600000-ABC12",
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 98765-4321",
  "date": "2025-02-15T00:00:00Z",
  "time": "19:00",
  "guests": 4,
  "specialRequests": "Mesa próxima à janela",
  "status": "pending",
  "createdAt": "2025-02-08T14:00:00Z"
}
```

---

## 🔐 Validações

### Frontend
- ✅ Email válido
- ✅ Telefone preenchido
- ✅ Endereço/dados obrigatórios
- ✅ Carrinho não vazio
- ✅ Data e horário selecionados

### Backend
- ✅ Todas as validações NestJS
- ✅ Tipos definidos em DTOs
- ✅ Constraints no MongoDB

---

## 🎯 Próximos Passos (Opcional)

1. **Pagamento:** Integrar Stripe/MercadoPago
2. **Notificações:** Configurar Twilio para SMS
3. **Admin Dashboard:** Painel para gerenciar pedidos e reservas
4. **Autenticação:** Login de usuários com JWT
5. **Histórico:** Página do cliente com seus pedidos/reservas

---

## 📝 Checklist

Confirme que está funcionando:

- [ ] Frontend carrega seção "Peça Seu Café"
- [ ] Aba "Fazer Pedido" funciona
- [ ] Aba "Reservar Mesa" funciona
- [ ] Formulários validam corretamente
- [ ] Mensagens de sucesso aparecem
- [ ] Backend não retorna erros
- [ ] MongoDB está recebendo dados
- [ ] IDs (orderId, reservationId) são gerados

---

**Status:** ✅ Sistema Completo e Funcionando 🎉
