import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/create-cart.dto';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // GET /api/cart?user=userId
  @Get()
  async getCart(@Query('user') user: string = 'guest') {
    return this.cartService.getCart(user);
  }

  // POST /api/cart/add
  @Post('add')
  async addItem(
    @Query('user') user: string = 'guest',
    @Body() createCartDto: CreateCartDto,
  ) {
    return this.cartService.addItem(user, createCartDto);
  }

  // DELETE /api/cart/item?user=userId&productId=espresso
  @Delete('item')
  async removeItem(
    @Query('user') user: string = 'guest',
    @Query('productId') productId: string,
  ) {
    return this.cartService.removeItem(user, productId);
  }

  // PATCH /api/cart/quantity
  @Patch('quantity')
  async updateQuantity(
    @Query('user') user: string = 'guest',
    @Query('productId') productId: string,
    @Query('quantity') quantity: number,
  ) {
    return this.cartService.updateQuantity(user, productId, quantity);
  }

  // DELETE /api/cart/clear
  @Delete('clear')
  async clearCart(@Query('user') user: string = 'guest') {
    return this.cartService.clearCart(user);
  }
}
