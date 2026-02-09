export class CartItemDto {
  productId?: string;
  productName?: string;
  price?: number;
  quantity?: number;
  size?: string;
  image?: string;
}

export class CreateCartDto {
  user?: string;
  items?: CartItemDto[];
  total?: number;
}

export class UpdateCartDto {
  items?: CartItemDto[];
  total?: number;
}
