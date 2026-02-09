import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/create-order.dto';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // POST /api/orders - Criar novo pedido
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  // GET /api/orders - Listar todos os pedidos
  @Get()
  async getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  // GET /api/orders/:orderId - Obter pedido específico
  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    return this.ordersService.getOrderById(orderId);
  }

  // GET /api/orders/user?email=email@example.com
  @Get('user/:email')
  async getUserOrders(@Param('email') email: string) {
    return this.ordersService.getOrdersByEmail(email);
  }

  // PATCH /api/orders/:orderId/status
  @Patch(':orderId/status')
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(orderId, updateOrderStatusDto);
  }

  // DELETE /api/orders/:orderId - Cancelar pedido
  @Delete(':orderId')
  async cancelOrder(@Param('orderId') orderId: string) {
    return this.ordersService.cancelOrder(orderId);
  }

  // GET /api/orders/stats/summary - Estatísticas (dashboard)
  @Get('stats/summary')
  async getStats() {
    return this.ordersService.getStats();
  }
}
