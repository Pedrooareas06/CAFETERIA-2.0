# 🧪 Guia de Testes - Sistema de Pedidos e Reservas

## ✅ Testes Manuais (Passo a Passo)

### **1. Teste Frontend - Função "Fazer Pedido"**

**Pré-requisitos:**
- ✅ Backend rodando (`yarn dev` na pasta `/backend`)
- ✅ MongoDB conectado
- ✅ Site abrindo em `http://localhost:3000`

**Passos:**

1. Abra o site: `http://localhost:3000`
2. Scroll até encontrar "Peça Seu Café" (seção OrderingSection)
3. Clique na aba **"Fazer Pedido"** (ícone de sacola)
4. Na página anterior, clique em "Menu" ou vá direto para adicionar itens
5. Selecione **2-3 itens** do menu (ex: Espresso, Cappuccino)
6. Veja o carrinho atualizar
7. Volte para "Peça Seu Café" → "Fazer Pedido"
8. Preencha os campos:
   - **Email:** `teste@email.com`
   - **Telefone:** `(11) 98765-4321`
   - **Endereço:** `Rua Teste, 123 - São Paulo`
   - **Observações:** `Sem açúcar no café`
9. Clique em **"Confirmar Pedido"**
10. **Esperado:** Mensagem com "Seu pedido foi criado!" + orderId exibido

---

### **2. Teste Frontend - Função "Reservar Mesa"**

**Pré-requisitos:**
- ✅ Mesmo que acima

**Passos:**

1. Na seção "Peça Seu Café", clique na aba **"Reservar Mesa"** (ícone de calendário)
2. No campo **Data**, selecione uma data nos próximos 30 dias (ex: daqui a 5 dias)
3. **Esperado:** Campo "Horário" fica habilitado e carrega horários disponíveis
4. No campo **Horário**, selecione um slot (ex: 19:00)
5. No campo **Quantas Pessoas?**, selecione `4`
6. Preencha os outros campos:
   - **Nome:** `João Silva`
   - **Email:** `joao@email.com`
   - **Telefone:** `(11) 98765-4321`
   - **Pedidos Especiais:** `Mesa próxima à janela, por favor`
7. Clique em **"Reservar Mesa"**
8. **Esperado:** Mensagem com "Mesa reservada!" + reservationId exibido

---

### **3. Teste Backend - Horários Disponíveis**

**Comando:**
```bash
curl -X GET "http://localhost:3001/api/reservations/available/2025-02-15" \
  -H "Content-Type: application/json"
```

**Resposta Esperada:**
```json
{
  "date": "2025-02-15",
  "availableSlots": [
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00"
  ],
  "totalSlots": 10,
  "bookedSlots": []
}
```

✅ Se retornar menos slots, significa que já há reservas naquele dia
❌ Se retornar erro, verifique se o MongoDB está conectado

---

### **4. Teste Backend - Criar Reserva (cURL)**

**Comando:**
```bash
curl -X POST http://localhost:3001/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Automático",
    "email": "teste@example.com",
    "phone": "(11) 98765-4321",
    "date": "2025-02-15T00:00:00Z",
    "time": "19:00",
    "guests": 2,
    "specialRequests": "Teste via cURL"
  }'
```

**Resposta Esperada:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "reservationId": "RES-1707333600000-ABC12XYZ",
  "name": "Teste Automático",
  "email": "teste@example.com",
  "phone": "(11) 98765-4321",
  "date": "2025-02-15T00:00:00Z",
  "time": "19:00",
  "guests": 2,
  "specialRequests": "Teste via cURL",
  "status": "pending",
  "createdAt": "2025-02-08T14:00:00Z",
  "updatedAt": "2025-02-08T14:00:00Z"
}
```

---

### **5. Teste Backend - Listar Reservas**

**Comando:**
```bash
curl -X GET http://localhost:3001/api/reservations \
  -H "Content-Type: application/json"
```

**Resposta Esperada:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "reservationId": "RES-1707333600000-ABC12XYZ",
    "name": "João Silva",
    "date": "2025-02-15T00:00:00Z",
    "time": "19:00",
    "guests": 4,
    "status": "pending",
    ...
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "reservationId": "RES-1707333600000-XYZ789",
    "name": "Maria Santos",
    "date": "2025-02-16T00:00:00Z",
    "time": "12:30",
    "guests": 2,
    "status": "confirmed",
    ...
  }
]
```

---

### **6. Teste Backend - Obter Reservas por Email**

**Comando:**
```bash
curl -X GET "http://localhost:3001/api/reservations/user/joao@email.com" \
  -H "Content-Type: application/json"
```

**Resposta Esperada:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "reservationId": "RES-1707333600000-ABC12XYZ",
    "email": "joao@email.com",
    "name": "João Silva",
    ...
  }
]
```

---

## 🔴 Troubleshooting

### **Erro: "Cannot POST /api/reservations"**
- ❌ Backend não está rodando
- ✅ Solução: `cd backend && yarn dev`

### **Erro: "MongoError: connect ECONNREFUSED"**
- ❌ MongoDB não está conectado
- ✅ Solução: 
  - Verifique `.env` tem `MONGODB_URI` correto
  - Execute MongoDB localmente: `mongod`
  - Ou use MongoDB Atlas (cloud)

### **Erro: "TypeError: Cannot read property 'availableSlots'"**
- ❌ Frontend esperava formato diferente da API
- ✅ Solução: Verifique se backend retorna array de strings: `["11:30", "12:00", ...]`

### **Horários Disponíveis Muda a Cada Requisição**
- ✅ Normal! O endpoint consulta banco de dados em tempo real
- Se 10 slots inicialmente, mas após criar reserva em "19:00", retorna 9 slots
- Isso significa que o sistema está **funcionando corretamente**

### **Formulário Não Validate Email**
- ❌ Campo email não está validando
- ✅ Solução: Verifique se `type="email"` está no `<Input>`

### **Aba "Reservar Mesa" Desaparece**
- ❌ Componente ReservationForm não carregou
- ✅ Solução: Verifique erro no console (F12) → Console tab

---

## ✨ Teste de Integração Completo

**Cenário:** Cliente faz pedido + reserva mesa tudo em um só acesso

1. **Abre site** → `http://localhost:3000`
2. **Faz pedido:**
   - Adiciona itens ao carrinho
   - Clica "Fazer Pedido"
   - Preenche email/telefone/endereço
   - Clica "Confirmar Pedido"
   - ✅ Vê mensagem "Pedido criado" com ID

3. **Faz reserva:**
   - Clica "Reservar Mesa"
   - Seleciona data para próxima semana
   - Escolhe horário disponível
   - Preenche dados
   - Clica "Reservar Mesa"
   - ✅ Vê mensagem "Reserva confirmada" com ID

4. **Verifica dados em MongoDB:**
   ```bash
   # No terminal MongoDB
   use cafe-raizes
   db.orders.findOne({email: "seu@email.com"})
   db.reservations.findOne({email: "seu@email.com"})
   ```

---

## 📊 Dados de Teste Recomendados

**Usuário 1:**
```
Nome: João Santos
Email: joao@example.com
Telefone: (11) 98765-4321
Endereço: Rua A, 123 - São Paulo
```

**Usuário 2:**
```
Nome: Maria Silva
Email: maria@example.com
Telefone: (21) 99876-5432
Endereço: Av. B, 456 - Rio de Janeiro
```

**Variações de Data/Hora:**
```
Data próxima: 5 dias a partir de hoje
Horários: 12:00 (almoço), 19:00 (jantar)
Pessoas: 2, 4, 6
```

---

## 📈 Checklist de Validação

- [ ] Formulário de pedido aceita entrada
- [ ] Formulário de reserva carrega horários disponíveis
- [ ] Mensagens de sucesso aparecem após envio
- [ ] IDs (orderId, reservationId) são únicos
- [ ] Dados aparecem em MongoDB
- [ ] Backend não retorna erros 500
- [ ] Frontend não tem erros de console
- [ ] Validação de email funciona
- [ ] Validação de telefone funciona
- [ ] Seleção de data respeita range de 30 dias

---

## 🚀 Próximos Testes

Após confirmar que tudo acima funciona:

1. **Teste de Performance:** Criar 100 reservas e verificar tempo de resposta
2. **Teste de Segurança:** Enviar dados malformados (SQL injection, XSS, etc.)
3. **Teste de Concorrência:** Dois usuários tentando reservar mesmo horário
4. **Teste de Notificação:** Integrar Twilio/Email e testar confirmação automática
5. **Teste de Pagamento:** Adicionar Stripe e testar fluxo de pagamento

---

**Data de Criação:** 2025-02-08
**Status:** ✅ Pronto para Testar
