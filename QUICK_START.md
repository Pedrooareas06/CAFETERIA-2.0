# 🚀 Quick Start Guide - Café Raízes

## ⏱️ 3 Passos para Começar (5 minutos)

### **1️⃣ Iniciar Backend**

```bash
cd backend
yarn install  # (se não fez ainda)
yarn dev
```

✅ **Esperado:** Mensagem `[NestJS] Listening on port 3001`

---

### **2️⃣ Iniciar Frontend**

Em **outro terminal:**

```bash
cd ../  # volta para raiz
yarn dev
```

✅ **Esperado:** Mensagem `- Local: http://localhost:3000`

---

### **3️⃣ Testar**

1. Abra `http://localhost:3000`
2. Scroll até **"Peça Seu Café"** (entre Testimonials e Contact)
3. Teste as abas:
   - ✅ "Fazer Pedido" - Cria pedido
   - ✅ "Reservar Mesa" - Reserva tabla

---

## 📋 Pre-Requisitos

### Ter Instalado
- ✅ Node.js 18+
- ✅ MongoDB (local ou MongoDB Atlas)
- ✅ Git

### Arquivo `.env` Configurado

Na pasta `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/cafe-raizes
# OU para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cafe-raizes

PORT=3001
FRONTEND_URL=http://localhost:3000
```

---

## 🔍 Verificar Se Tudo Está Funcionando

### Terminal 1 (Backend)
```
✅ Deve mostrar:
[Nest] 12345  - 02/08/2025, 14:30:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 02/08/2025, 14:30:01 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +456ms
[Nest] 12345  - 02/08/2025, 14:30:01 AM     LOG [RoutesResolver] CartController {/api/cart}:
[Nest] 12345  - 02/08/2025, 14:30:01 AM     LOG [RoutesResolver] OrdersController {/api/orders}:
[Nest] 12345  - 02/08/2025, 14:30:01 AM     LOG [RoutesResolver] ReservationsController {/api/reservations}:
[Nest] 12345  - 02/08/2025, 14:30:01 AM     LOG [NestApplication] Nest application successfully started
```

### Terminal 2 (Frontend)
```
✅ Deve mostrar:
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local
  
○ Compiling /...
✓ Compiled /page (123ms)
```

### Browser
```
✅ Site carrega sem erros
✅ Console (F12) sem erros vermelhos
✅ Seção "Peça Seu Café" visível
```

---

## 🧪 Teste Rápido (Pedido)

1. Na página, clique em **"Menu"** ou scroll para menu
2. Adicione 2-3 itens ao carrinho 🛒
3. Volte para **"Peça Seu Café"** → **"Fazer Pedido"**
4. Preencha:
   ```
   Email: seu@email.com
   Telefone: (11) 98765-4321
   Endereço: Rua Teste, 123
   ```
5. Clique **"Confirmar Pedido"**
6. Veja mensagem: `✓ Seu pedido foi criado!`

---

## 🧪 Teste Rápido (Reserva)

1. Na seção **"Peça Seu Café"**, clique **"Reservar Mesa"**
2. Selecione data: próximos dias aparecem
3. Selecione horário: deve mostrar opções (11:30, 12:00, 19:00, etc)
4. Preencha:
   ```
   Nome: João Silva
   Email: joao@email.com
   Telefone: (11) 98765-4321
   Pessoas: 4
   ```
5. Clique **"Reservar Mesa"**
6. Veja mensagem: `✓ Mesa reservada com sucesso!`

---

## 🛠️ Se Algo Não Funcionar

### ❌ "Cannot POST /api/reservations"
```bash
# Solução: Backend offline
cd backend && yarn dev  # recomece backend
```

### ❌ "MongoError: connect ECONNREFUSED"
```bash
# MongoDB offline. Opções:
# 1. Local (Windows):
mongod

# 2. MongoDB Atlas (cloud):
# Atualize MONGODB_URI no .env com seu cluster
```

### ❌ "404 page not found"
```bash
# Frontend offline
cd (pasta raiz) && yarn dev  # recomece frontend
```

### ❌ Horários não carregam
```
Solução: Backend sem ReservationsModule compilado
cd backend && yarn build
yarn dev
```

---

## 📱 URLs Importantes

| O Quê | URL |
|-------|-----|
| Site | `http://localhost:3000` |
| API | `http://localhost:3001/api/` |
| Pedidos | `http://localhost:3001/api/orders` |
| Reservas | `http://localhost:3001/api/reservations` |
| Horários | `http://localhost:3001/api/reservations/available/:date` |

---

## 📚 Documentação

| Arquivo | Para Quem |
|---------|----------|
| `ORDERING_SYSTEM_DOCS.md` | Entender como funciona o sistema |
| `TESTING_GUIDE.md` | Testar com cURL e passo-a-passo |
| `IMPLEMENTATION_SUMMARY.md` | Ver estrutura de arquivos |
| Este arquivo | Começar rapidinho |

---

## ✅ Checklist de Startup

- [ ] Node.js instalado (`node --version`)
- [ ] MongoDB rodando (local ou Atlas conectado)
- [ ] `.env` configurado na pasta `backend/`
- [ ] Backend rodando `yarn dev` (porta 3001)
- [ ] Frontend rodando `yarn dev` (porta 3000)
- [ ] Site abrindo sem erros
- [ ] Seção "Peça Seu Café" visível
- [ ] Teste de pedido funcionando
- [ ] Teste de reserva funcionando

---

## 🎉 Pronto!

Se chegou aqui e tudo funciona:

```
         🎯 PARABÉNS! Sistema de pedidos e reservas está VIVO! 🎯

   ✨ Clientes podem fazer pedidos online
   ✨ Clientes podem reservar mesa
   ✨ Dados salvos em MongoDB
   ✨ Backend respondendo corretamente
   ✨ Frontend integrado completamente
```

---

## 🚀 Próximos Passos

1. **Imediato:** Testar com mais usuários
2. **Hoje:** Integrar notificações (WhatsApp/Email)
3. **Esta semana:** Adicionar pagamento online
4. **Próximo:** Admin dashboard para gerenciar pedidos

---

**Dúvidas?** Verifique `TESTING_GUIDE.md` para testes detalhados com cURL!

**Última atualização:** 2025-02-08
