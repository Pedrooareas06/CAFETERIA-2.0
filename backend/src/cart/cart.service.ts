import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { CreateCartDto, UpdateCartDto } from './dto/create-cart.dto';
import { Cart } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private cartModel: Model<Cart & Document>) {}

  // Criar ou obter carrinho
  async createOrGetCart(userId: string = 'guest'): Promise<any> {
    let cart = await this.cartModel.findOne({ user: userId });

    if (!cart) {
      cart = await this.cartModel.create({
        user: userId,
        items: [],
        total: 0,
      });
    }

    return cart;
  }

  // Adicionar item ao carrinho
  async addItem(userId: string, createCartDto: CreateCartDto): Promise<any> {
    const cart = await this.createOrGetCart(userId);

    // Procura se o item já existe
    const existingItem = (cart.items || []).find(
      (item: any) =>
        item.productId === createCartDto.items?.[0]?.productId &&
        item.size === createCartDto.items?.[0]?.size,
    );

    if (existingItem && createCartDto.items?.[0]) {
      existingItem.quantity += createCartDto.items[0].quantity || 1;
    } else if (createCartDto.items?.[0]) {
      cart.items.push(createCartDto.items[0]);
    }

    // Recalcula total
    cart.total = (cart.items || []).reduce((sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 0), 0);
    await cart.save();

    return cart;
  }

  // Remover item do carrinho
  async removeItem(userId: string, productId: string): Promise<any> {
    const cart = await this.createOrGetCart(userId);
    cart.items = (cart.items || []).filter((item: any) => item.productId !== productId);

    // Recalcula total
    cart.total = (cart.items || []).reduce((sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 0), 0);
    await cart.save();

    return cart;
  }

  // Obter carrinho
  async getCart(userId: string = 'guest'): Promise<any> {
    return this.createOrGetCart(userId);
  }

  // Limpar carrinho
  async clearCart(userId: string = 'guest'): Promise<any> {
    const cart = await this.createOrGetCart(userId);
    cart.items = [];
    cart.total = 0;
    await cart.save();

    return cart;
  }

  // Atualizar quantidade
  async updateQuantity(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<any> {
    const cart = await this.createOrGetCart(userId);
    const item = (cart.items || []).find((i: any) => i.productId === productId);

    if (item) {
      if (quantity <= 0) {
        cart.items = (cart.items || []).filter((i: any) => i.productId !== productId);
      } else {
        item.quantity = quantity;
      }

      cart.total = (cart.items || []).reduce((sum: number, i: any) => sum + (i.price || 0) * (i.quantity || 0), 0);
      await cart.save();
    }

    return cart;
  }
}
