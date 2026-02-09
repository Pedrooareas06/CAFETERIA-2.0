import { Schema } from 'mongoose';

export const CartSchema = new Schema(
  {
    user: String,
    items: [
      {
        productId: String,
        productName: String,
        price: Number,
        quantity: Number,
        size: String,
        image: String,
      },
    ],
    total: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string;
}

export interface Cart {
  _id?: string;
  user?: string;
  items: CartItem[];
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}
