export class OrderItemDto {
  productId?: string;
  productName?: string;
  price?: number;
  quantity?: number;
  size?: string;
}

export class CreateOrderDto {
  user?: string;
  email?: string;
  phone?: string;
  address?: string;
  items?: OrderItemDto[];
  total?: number;
  paymentMethod?: string;
  notes?: string;
}

export class UpdateOrderStatusDto {
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}
