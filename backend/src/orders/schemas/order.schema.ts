import { Schema } from 'mongoose';

export const OrderSchema = new Schema(
  {
    orderId: { type: String, unique: true },
    user: String,
    email: String,
    phone: String,
    address: String,
    items: [
      {
        productId: String,
        productName: String,
        price: Number,
        quantity: Number,
        size: String,
      },
    ],
    total: Number,
    status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered'], default: 'pending' },
    paymentMethod: String,
    notes: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface Order {
  _id?: string;
  orderId: string;
  user?: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  paymentMethod?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
