import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private orderModel: Model<Order & Document>) {}

  // Criar novo pedido
  async createOrder(createOrderDto: CreateOrderDto): Promise<any> {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const order = await this.orderModel.create({
      ...createOrderDto,
      orderId,
      status: 'pending',
    });

    return order;
  }

  // Listar todos os pedidos
  async getAllOrders(): Promise<any[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).exec();
  }

  // Obter pedido por ID
  async getOrderById(orderId: string): Promise<any> {
    return this.orderModel.findOne({ orderId }).exec();
  }

  // Obter pedidos do usuário
  async getUserOrders(user: string): Promise<any[]> {
    return this.orderModel.find({ user }).sort({ createdAt: -1 }).exec();
  }

  // Obter pedidos por email
  async getOrdersByEmail(email: string): Promise<any[]> {
    return this.orderModel.find({ email }).sort({ createdAt: -1 }).exec();
  }

  // Atualizar status do pedido
  async updateOrderStatus(
    orderId: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<any> {
    return this.orderModel
      .findOneAndUpdate({ orderId }, updateOrderStatusDto, { new: true })
      .exec();
  }

  // Cancelar pedido
  async cancelOrder(orderId: string): Promise<any> {
    return this.orderModel
      .findOneAndUpdate({ orderId }, { status: 'cancelled' }, { new: true })
      .exec();
  }

  // Estatísticas (dashboard)
  async getStats() {
    const totalOrders = await this.orderModel.countDocuments();
    const totalRevenue = await this.orderModel.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    const ordersByStatus = await this.orderModel.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    return {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      ordersByStatus,
    };
  }
}
